'use client'
import { BooksProps } from "@/types"
import Link from "next/link"
import EditBooksButtons from "@/components/Books/EditBooksButtons"
import Button1 from "@/components/button1"
import '@/styles/bookCard.css'

export default function BookCard({ book, onEdit }: { book: BooksProps; onEdit: (id: number) => void }) {
    return (
        <>
        <div className="book-cnt" onClick={()=>onEdit(Number(book.id))}>
            <Link href={`/books/${book.name}`} className="image-books-cnt">
                <img src={book.photo} alt="Фото книги" className="image-book-card" />
                <span>{`Ціна: ${book.price} $`}</span>
                <h2  className="name-books">{book.name}</h2>
                < Button1 clas="basket-button" title="В корзину" />
            </Link>
            <EditBooksButtons book={book} />
        </div>
        </>
    )
}