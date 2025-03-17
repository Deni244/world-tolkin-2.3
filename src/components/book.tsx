'use client'
import { BooksProps } from "@/types"
import Button1 from "./button1"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import '@/styles/book.css'

export default function Book(book: BooksProps) {
    const { user } = useAuth();
    
    return (
        <>
        <div className="book-cnt">
            <div className="image-book-cnt">
                <img src={book.photo} alt="Фото книги" className="image-book" />
                <span>{`Ціна: ${book.price} $`}</span>
                < Button1 clas="button-global" title="В корзину" />
            </div>
            <div className="name-description-cnt">
                <div className="name-book-cnt">
                    <Link href={`/books/${book.name}`} className="name-book">{book.name}</Link>
                </div>
                <div className="description-book-cnt">
                    <p className="description-book">{book.description}</p><Link href={`/books/${book.name}`}>Детальніше</Link>
                </div>
                {
                    user?.isAdmin && <div className="book-button_container">
                    < Button1 clas="button-global" title="Видалити" />
                    < Button1 clas="button-global" title="Змінити" />
                    </div>
                }
            </div>
        </div>
        </>
    )
}