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

export function AuthProvider ({ children }: { children: React.ReactNode}) {
    const [user, setUser] = useState<Partial<User> | null>(null);
   
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
            console.log(`Спацював useEffect ${result.user?.isadmin}`);
            setUser(result.user);
            await refresh();
          }
        }
        loadUser();
      }, []);
      
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