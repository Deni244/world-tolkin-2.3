
import EditBooksButtons from "@/components/Books/EditBooksButtons";
import Button1 from "@/components/button1";
import { GetOneBook } from "@/store/booksFunction";
import '@/styles/Books.css'

type PageProps = {
    params: Promise<{ name: string }>,
}
export default async function NameBook({params}: PageProps) {
    const {name} = await params;
    const book = await GetOneBook(name);
    return (
        <div className="container-book">
            <div className="image-nav-book-cnt">
                <img className="image-book" src={book.photo} />
                <div className="nav-book-container">
                    <h1 className="name-book">{book.name}</h1>
                    <span>{`Ціна: ${book.price}$`}</span>
                    < Button1 clas="basket-button" title="В корзину" />
                    <EditBooksButtons id={book.id!} />
                </div>
            </div>
            <p className="description-book-cnt">{book.description}</p>
            


        </div>
    )


}