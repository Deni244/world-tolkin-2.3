'use client'
import dynamic from 'next/dynamic';
import { BooksProps } from "@/types";
import { useState } from "react";
import EditBookForm from "./EditBookForm";
import BookCard from "./bookCard";

const LazyBookCard = dynamic(() => import('./bookCard'), { ssr: false });

export default function Books({books}:{ books: BooksProps[]}) {
    const [selectBook, setSelectBook] = useState(books[0])
    const handleEditClick = (id: number) => {
        const book = books[id-1];
        setSelectBook(book);
      };


return (
    <>
        <EditBookForm book={selectBook} />    
        {
            books.map((book: BooksProps) => (
                <LazyBookCard 
                key={book.id}
                book={book}
                onEdit={handleEditClick}
                />
            ))
        }
    </>
)
}