'use client'
import { BooksProps } from "@/types"
import Link from "next/link"
import EditBooksButtons from "@/components/Books/EditBooksButtons"
import Button1 from "@/components/button1"
import '@/styles/bookCard.css'
import { kurale } from "@/lib/fonts"

export default function BookCard({ book, onEdit }: { book: BooksProps; onEdit: (id: number) => void }) {
    return (
        <>
        <div className="book-cnt" onClick={()=>onEdit(Number(book.id))}>
            <Link href={`/books/${book.name}`} className="image-books-cnt">
                <img src={book.photo} alt="Фото книги" className="image-book-card" />
                <span className={kurale.className}>{`Ціна: ${book.price} $`}</span>
                <h2  className={`name-books ${kurale.className}`}>{book.name}</h2>
            </Link>
            < Button1 clas="basket-button" title="В корзину" />
            <EditBooksButtons book={book} />
        </div>
        </>
    )
}