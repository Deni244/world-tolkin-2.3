import { GetOneBook } from "@/store/booksFunction";

type PageProps = {
    params: Promise<{ name: string }>,
}
export default async function NameBook({params}: PageProps) {
    const {name} = await params;
    
    const book = await GetOneBook(name);
    
    
    return (
        <div className="book-container">
            <img src={book.photo} />
            <h1>{book.name}</h1>
            


        </div>
    )


}