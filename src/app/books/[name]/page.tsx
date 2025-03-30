import { notFound } from "next/navigation";
import EditBookForm from "@/components/Books/EditBookForm";
import EditBooksButtons from "@/components/Books/EditBooksButtons";
import Button1 from "@/components/button1";
import { GetBooks, GetOneBook } from "@/store/booksFunction";
import '@/styles/Books.css'
import { BooksProps } from "@/types";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts: BooksProps[] = await GetBooks();

    return posts.map(post=>({
        slug: post.name.toString(),
    }))
}

export const revalidate = 10;

type PageProps = {
    params: Promise<{ name: string }>,
}

export async function generateMetadata({ params }: PageProps) {
    const { name } = await params;
    const decodeName = decodeURIComponent(name)
    const title = decodeName;
  const description = `Книга: ${name}`;
  return {
    title, description
  }
}


export default async function NameBook({params}: PageProps) {
    const {name} = await params;
    const book = await GetOneBook(name);
    return (
        <>
            <div className="container-book">
                <div className="image-nav-book-cnt">
                    <img className="image-book" src={book.photo} />
                    <div className="nav-book-container">
                        <h1 className="name-book">{book.name}</h1>
                        <span>{`Ціна: ${book.price}$`}</span>
                        < Button1 clas="basket-button" title="В корзину" />
                        <EditBooksButtons book={book} />
                    </div>
                </div>
                <p className="description-book-cnt">{book.description}</p>
            </div>
            <EditBookForm book={book} />
        </>
    )
}
