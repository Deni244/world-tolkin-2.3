'use client'
import { BooksProps } from "@/types";
import { useAuth } from "@/context/AuthContext";
import '@/styles/Books.css'
import Button1 from "./button1";


export default function searchBook({data}:{ data: BooksProps[]} ) {
    const {user} = useAuth();
        
        return (
           <>
           
           </>
            
        )
}