'use client'

import { createContext, useContext, useEffect, useState } from "react";
import { createProfile, logInProfile, exitProfile, refresh, getUser } from "@/lib/authAction";
import { User } from "@/types";

type Result = {
    user?: User | null;
    success?: boolean;
    message: string;
    status?: number;
    error?: string;
  }
interface AuthContextType {
user: Partial<User> | null;
registry: (user: User) => Promise<Result>;
login : (email: string, password: string) => Promise<Result>;
logout : ()=> Promise<Result>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider ({ children, initialUser  }: { children: React.ReactNode; initialUser: Partial<User> | null }) {
    const [user, setUser] = useState<Partial<User> | null>(initialUser);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // async function refreshSession() {
    //     if (isRefreshing || !user) return;
    //     setIsRefreshing(true);
    //     const result = await refresh();
    //     if (result.success && result.user) {
    //       setUser(result.user);
    //     } else {
    //       setUser(null);
    //     }
    //     setIsRefreshing(false);
    //   }
//Функція реєстрації
    async function registry(user: User): Promise<Result> {
        const result = await createProfile(user);
        return {success: result.success, message: result.message, status: result.status};
    }
//Функція логування
    async function login(email: string, password: string): Promise<Result> {
            const result = await logInProfile(email, password);
            if(result.user) {
                setUser(result.user);
                console.log(result.user);
            }
            return {success: result.success ,message: result.message, status: result.status};
    }
//Функція виходу з профілю
    async function logout(): Promise<Result> {
        const result = await exitProfile();
        if (result.success){
          setUser(null);
        }
        return {message: result.message, status: result.status};
    }
    useEffect(() => {
        async function loadUser() {
          const result = await getUser();
          if (result?.success) {
            setUser(result.user);
            await refresh();
          }
        }
        loadUser();
      }, []);

    // useEffect(() => {
    //     refreshSession();
    //   }, []);

    //   useEffect(() => {
    //     if (!user) return; // Якщо користувача немає, не оновлюємо
    
    //     const interval = setInterval(() => {
    //       refreshSession();
    //     }, 15 * 60 * 1000); // Оновлення кожні 15 хвилин
    
    //     return () => clearInterval(interval); // Очищаємо інтервал при виході
    //   }, [user]);
      
    return (
        <AuthContext.Provider value={{ user, registry, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth має використовуватись всередині AuthProvider");
    }
    return context;
}