'use client'
import { BooksProps } from "@/types"
import Button1 from "./button1"
import { useAuth } from "@/context/AuthContext"
import { deleteBook } from "@/store/booksFunction"
import { useModalStore } from "@/store/ModalWindowState"
import '@/styles/book.css'
import Link from "next/link"

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
            <Link href={`/books/${book.name}`} className="image-book-cnt">
                <img src={book.photo} alt="Фото книги" className="image-book" />
                <span>{`Ціна: ${book.price} $`}</span>
                <h2  className="name-book">{book.name}</h2>
                < Button1 clas="basket-button" title="В корзину" />
            </Link>
                {
                    user?.isadmin &&  <div className="book-admin-panel">
                    < Button1 clas="button-book-admin" title="Видалити" onClick={()=>{openModal({title: 'Ви впевнені що хочете видалити книгу?', buttonText: 'Видалити', abolition: true, onConfirm: ()=>handleDeleBook(book.id!)})} } />
                    < Button1 clas="button-book-admin" title="Редагувати" />
                    </div>
                }  
        </div>
        </>
    )
}