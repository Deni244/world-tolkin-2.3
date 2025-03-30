
import { GetBooks } from '@/store/booksFunction';
import { Metadata } from 'next';
import Books from '@/components/Books/Books';


export const revalidate = 10;

export const metadata: Metadata = {
    title: "Книги",
    description: "книги Толкіна",
  };

export default async function BooksPage() {
    const books = await GetBooks();
    return (
        <div className="cnt-contein-books">
            <Books books={books} />
        </div>      
    )
}



