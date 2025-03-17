
import { GetBooks } from '@/store/booksFunction';
import { Metadata } from 'next';
import { BooksProps } from "@/types";
import Book from '@/components/book';
import '@/styles/Books.css'


export const metadata: Metadata = {
    title: "Книги",
    description: "книги Толкіна",
  };

export default async function BooksPage() {
    const books = await GetBooks();
    return (
        <div className="cnt-contein-books">
                              
            {
                books.map((book: BooksProps) => (
                    <Book key={book.id}
                    name={book.name}
                    description={book.description}
                    photo={book.photo}
                    price={book.price} 
                    />
                ))
            }
            
        </div>      
        
    )
}