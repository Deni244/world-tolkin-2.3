import EditBookForm from "@/components/Books/EditBookForm";
import EditBooksButtons from "@/components/Books/EditBooksButtons";
import Button1 from "@/components/button1";
import { GetOneBook } from "@/store/booksFunction";
import Image from "next/image";
import '@/styles/Books.css'
import { kurale } from "@/lib/fonts";


type PageProps = {
    params: Promise<{ name: string }>,
}

export async function generateMetadata({ params }: PageProps) {
    const { name } = await params;
    console.log(`Параметр мета дати ${name}`);
    const decodeName = decodeURIComponent(name)
    const title = decodeName;
  const description = `Книга: ${decodeName}`;
  return {
    title, description
  }
}


export default async function NameBook({params}: PageProps) {
    const {name} = await params; 
    const data = await GetOneBook(name);
    const book = data.book;
    if(book === null)  {return <div className="container-book"><h1 className={`name-book ${kurale.className}`}>Книгу не знайдено</h1></div>}
    return (
        <>
            <div className="container-book">
                <div className="image-nav-book-cnt">
                    <Image 
                        className="image-book" 
                        src={book.photo}
                        alt={book.name}
                        height={300}
                        width={200}
                     />
                    <div className="nav-book-container">
                        <h1 className={`name-book ${kurale.className}`}>{book.name}</h1>
                        <span className={kurale.className}>{`Ціна: ${book.price}$`}</span>
                        < Button1 clas="basket-button" title="В корзину" />
                        <EditBooksButtons book={book} />
                    </div>
                </div>
                <p className={`description-book-cnt ${kurale.className}`}>{book.description}</p>
            </div>
            <EditBookForm book={book} />
        </>
    )
}
