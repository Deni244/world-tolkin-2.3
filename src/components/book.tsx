'use client'
import { BooksProps } from "@/types"
import Button1 from "./button1"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

import '@/styles/book.css'
import { deleteBook } from "@/store/booksFunction"
import { useModalStore } from "@/store/ModalWindowState"

export default function Book(book: BooksProps) {
    const { user } = useAuth();
    const {openModal, closeModal} = useModalStore();

    const handleDeleBook = async (id: string) =>{
        const res = await deleteBook(id);
        openModal({title: res.message, onConfirm: closeModal})
    }
    
    return (
        <>
        <div className="book-cnt">
            <div className="image-book-cnt">
                <img src={book.photo} alt="Фото книги" className="image-book" />
                <span>{`Ціна: ${book.price} $`}</span>
                <h2  className="name-book">{book.name}</h2>
                < Button1 clas="basket-button" title="В корзину" />
                </div>

           
                {
                    user?.isadmin &&  <div className="book-admin-panel">
                    < Button1 clas="button-book-admin" title="Видалити" onClick={()=>handleDeleBook(book.id!) } />
                    < Button1 clas="button-book-admin" title="Редагувати" />
                    </div>
                }    
            
            
        </div>
        </>
    )
}