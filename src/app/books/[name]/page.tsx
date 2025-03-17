
import Book from "@/components/book";
import { GetOneBook } from "@/store/booksFunction";

type PageProps = {
    params: Promise<{ name: string }>,
}
export default async function NameBook({params}: PageProps) {
    const {name} = await params;
    const book = await GetOneBook(name);
    return (
        <Book key={book.id}
        name={book.name}
        description={book.description}
        photo={book.photo}
        price={book.price} />
    )


}