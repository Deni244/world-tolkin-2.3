'use client'
import { BooksProps } from "@/types";
import { useAuth } from "@/context/AuthContext";
import '@/styles/Books.css'



export default function searchBook({data}:{ data: BooksProps[]} ) {
    const {user} = useAuth();
        
        return (
           <>
           
           </>
            
        )
}