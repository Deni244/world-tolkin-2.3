'use client'
import { BooksProps } from "@/types"
import Button1 from "./button1"
import '@/styles/book.css'
import Link from "next/link"

export default function Book(book: BooksProps) {
    
    return (
        <div className="book-cnt">
            <div className="image-book-cnt">
                <img src={book.photo} alt="Фото книги" className="image-book" />
                <span>{`${book.price} $`}</span>
                < Button1 clas="button-global" title="Додати в корзину" />
            </div>
            <div className="name-description-cnt">
                <div className="name-book-cnt">
                    <h2 className="name-book">{book.name}</h2>
                </div>
                <div className="description-book-cnt">
                    <p className="description-book">{book.description}</p><Link href={`/books/${book.name}`}>Детальніше</Link>
                </div>
            </div>
        </div>
    )
}