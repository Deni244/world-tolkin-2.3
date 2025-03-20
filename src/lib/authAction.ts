'use server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "@/lib/db";
import { cookies } from "next/headers";
import { User } from "@/types";

const REFRESH_SECRET = process.env.REFRESH_SECRET || "refreshsecret";

type Result = {
  user?: Partial<User> | null;
  accessToken?: string;
  message: string;
  status?: number;
  error?: string;
  success?: boolean;
}

//Функція реєстрації користувача
export async function createProfile(user: Omit<User, "id">){
    const {name, email, password, ...otherData} = user;
    //Перевірка чи є email та password
    if(!email || !password) return ({success: false, message: "Необхідно пошта та пароль", status: 401});
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        //Встановлення основних полів
        const fields = ["name", "email", "password"];
        const values = [name, email, hashedPassword];
        //Запис додаткових полів(якщо вони є)
        for (const [key, value] of Object.entries(otherData)) {
            if (key !== "id" && value !== undefined) {
                fields.push(key);
                values.push(typeof value === "boolean" ? value.toString() : value);
            }
        }
        const fieldsString = fields.join(", "); // "name, email, password"
        const placeholders = fields.map((_, i) => `$${i + 1}`).join(", "); // "$1, $2, $3"
        //Створення правильного запиту до бази даних
        const query = `
        INSERT INTO users (${fieldsString}) 
        VALUES (${placeholders})
      `;
      await sql(query, values);
        //Запис у базу даних
      return ({success: true, message: 'Реєстрація успішна!', status: 200});
      
    } catch (error: any) {
        if (error.code === "23505") {
          return { success: false, message: "Користувач з таким email вже існує!", status: 401 };
        }
        return {success: false, message: 'Помилка бази даних ' + error.message, error: error.message, status: 401 };
    }
}

//Функція логування користувача
export async function logInProfile(email: string, password: string): Promise<Result>{
    try{    
        const dbUser = await sql`SELECT id, name, email, password, sex, isadmin FROM users WHERE email = ${email};`;
        if (dbUser.length === 0){
          return {success: false, message: `Користувача з email: ${email} не існує!`, status: 400  };
        }
        else if(!(await bcrypt.compare(password, dbUser[0].password))){
            return {success: false, message: "Ви ввели невірний пароль!", status: 400  };
        }
        //Генерація токену
        console.log(`Ця змінна з логування перед створенням токену ${dbUser[0].isadmin}`);
        
        const userToken = await generateRefreshToken(dbUser[0])
        
        return {success: true, user: {id: userToken.user.id, email: userToken.user.email, name: userToken.user.name, isadmin: userToken.user.isadmin }, message: `Вітаю ${userToken.user.name}!`, status: 200 };
    }
    catch (error) {
        console.error("Login error:", error);
        return {success: false, message: `Server error ${error}`  ,  status: 500 };
    }

}


//Скорочена функція реєстрації
export async function shortCreateProfile(name:string, email: string) {
  const dbUser = await sql`SELECT id, name, email, password, sex, isadmin FROM users WHERE email = ${email};`;
  if(dbUser.length === 0){
    const values = [name, email, null];
    const query = `
        INSERT INTO users (name, email, password) 
        VALUES ($1, $2, $3)
        RETURNING id, name, email, isadmin
      `;
      const res = await sql(query, values);
      if(!res[0].id) throw new Error("Помилка при створенні користувача");
      const user = await generateRefreshToken(res[0]);
      if (!user.user) {
        throw new Error("Помилка при створенні токена!");
      }
  }else{
    const user = await generateRefreshToken(dbUser[0]);
      if (!user.user) {
        throw new Error("Помилка при створенні токена!");
      }
  }
 
      
      
      return {success: true, status: 200 };
}

//Функція Виходу з профіля
export async function exitProfile() {
    try {
      const cookiesStore = await cookies();
      cookiesStore.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0)
      });
  
      return { success: true, message: "Вихід успішно здійснено!", status: 200 };
    }
    catch (error){
      return {success: false, message: "Server error", status: 500 };
    }
  }

//Отримання користувача з cookies через token
export async function getUser() {
  const cookieStore = await cookies();
  let refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return {success: false, user: null, message: "Refresh token not found", status: 401 };
  try {
    let decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number; email: string; name: string, isadmin: boolean };
    return {success: true, user: {id: decoded.id, name: decoded.name, email: decoded.email, isadmin: decoded.isadmin }, status: 200 };
  } catch {
    return null;
  }
}

//Функція генерації токену
export async function generateRefreshToken(user: Partial<User>) {
  const now = Math.floor(Date.now() / 1000);
  const refreshToken = jwt.sign({
    id: user.id, 
    email: user.email,
    name: user.name, 
    isadmin: user.isadmin, 
    lastRefresh: now 
  },REFRESH_SECRET, {expiresIn: "7d"});
        const cookieStore = await cookies();
        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });
        return {success: true, user: {id: user.id, email: user.email, name: user.name, isadmin: user.isadmin }, lastRefresh: now, status: 200 };
}

//Оновлення Токену
export async function refresh() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return {success: false, user: null, message: "Refresh token not found", status: 401 };
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number; email: string, name: string, isadmin: boolean, lastRefresh?: number };
    //Отримання поточної дати
    const now = Math.floor(Date.now() / 1000);
    const lastRefresh = decoded.lastRefresh ?? 0;
    // Якщо останнє оновлення було більше ніж 24 години то йде оновлення refreshToken
    let newRefreshToken = refreshToken;
    if (now - lastRefresh > 86400) { // 86400 секунд = 24 години
      const res = await generateRefreshToken({ id: decoded.id, email: decoded.email, name: decoded.name, isadmin: decoded.isadmin})
      newRefreshToken = res.lastRefresh.toString();
    }
    return { success: true, user: { id: decoded.id, email: decoded.email, name: decoded.name, isadmin: decoded.isadmin} , message: "Tokens refreshed", status: 200};
  } catch (error) {
    return { success: null, user: null, message: "Invalid refresh token", status: 400 };
  }
}

