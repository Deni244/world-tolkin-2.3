'use server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
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
    //Підключення до БД
    const db = await connectDB();
    //Отримання користувача за email
    const dbUser = await db.get<User>("SELECT * FROM users WHERE email = ?", email);
    //Якщо користувач з таким email існує то повертаєм помилку
    if(dbUser) return ({success: false, message: `Користувач з email: ${email} вже існує!`, status: 401});
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        //Встановлення основних полів
        const fields = ["name", "email", "password"];
        const values = [name, email, hashedPassword];
        //Запис додаткових полів(якщо вони є)
        for (const [key, value] of Object.entries(otherData)) {
            if (key !== "id" && value !== undefined) {
                fields.push(key);
                values.push(value);
            }
        }
        //Заміна всіх ключіва на знаки питання(так просить база даних)
        const placeholders = fields.map(() => "?").join(", ");
        //Створення правильного запиту до бази даних
        const sql = `INSERT INTO users (${fields.join(", ")}) VALUES (${placeholders})`;
        //Запис у базу даних
        await db.run(sql, values);
      return ({success: true, message: 'Реєстрація успішна!', status: 200});
      
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return {success: false, message: 'Користувач вже існує!' };
        }
        return {success: false, message: 'Помилка бази даних', error: error.message, status: 401 };
    }
}

//Функція логування користувача
export async function logInProfile(email: string, password: string): Promise<Result>{
    try{    
        const db = await connectDB();
        const dbUser = await db.get<User>("SELECT * FROM users WHERE email = ?", email);
        if (!dbUser){
          return {success: false, message: `Користувача з email: ${email} не існує!`, status: 400  };
        }
        else if(!(await bcrypt.compare(password, dbUser.password))){
            return {success: false, message: "Ви ввели невірний пароль!", status: 400  };
        }
        //Генерація токенів
        const refreshToken = jwt.sign({id: dbUser.id, email, name: dbUser.name },REFRESH_SECRET, {expiresIn: "7d"});
        const cookieStore = await cookies();
        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/" 
        });
        return {success: true, user: {id: dbUser.id, email, name: dbUser.name }, message: `Вітаю ${dbUser.name}!`, status: 200 };
    }
    catch (error) {
        console.error("Login error:", error);
        return {success: false, message: "Server error" ,  status: 500 };
    }

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
      console.error("Logout error:", error);
      return {success: false, message: "Server error", status: 500 };
    }
  }

//Отримання користувача з cookies через token
export async function getUser() {
  const cookieStore = await cookies();
  let refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return {success: false, user: null, message: "Refresh token not found", status: 401 };
  try {
    let decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number; email: string; name: string };
    return {success: true, user: {id: decoded.id, name: decoded.name, email: decoded.email}, status: 200 };
  } catch {
    return null;
  }
}

//Оновлення Токену
export async function refresh() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) return {success: false, user: null, message: "Refresh token not found", status: 401 };
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET) as { id: number; email: string, name: string, lastRefresh?: number };
    //Отримання поточної дати
    const now = Math.floor(Date.now() / 1000);
    const lastRefresh = decoded.lastRefresh || 0;
    // Якщо останнє оновлення було більше ніж 24 години то йде оновлення refreshToken
    let newRefreshToken = refreshToken;
    if (now - lastRefresh > 86400) { // 86400 секунд = 24 години
      newRefreshToken = jwt.sign({ id: decoded.id, email: decoded.email, name: decoded.name, lastRefresh: now }, REFRESH_SECRET, { expiresIn: "7d" });

      // Закидання refreshToken у cookies
      cookieStore.set("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }
    return { success: true, user: { id: decoded.id, email: decoded.email, name: decoded.name} , message: "Tokens refreshed", status: 200};
  } catch (error) {
    return { success: null, user: null, message: "Invalid refresh token", status: 400 };
  }
}

