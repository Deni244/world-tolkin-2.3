
import { BooksProps } from "@/types";


export async function GetBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`,{
      method: 'GET',
    });
    const books = await res.json();
    return books;
  }

export async function GetOneBook(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${name}`,{
    method: 'GET',
  });
  const data = await res.json()
  return data;

}
  
export async function addBook(book: BooksProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: book.name,
        description: book.description,
        photo: book.photo,
        price: book.price
    }),
    });
    const newDB = await res.json();
  
  }

  export async function deleteBook(id: string) {
    console.log(`deleteBook: ${id}`);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id: id
      }),
    })
    const result = await res.json();
    return result;
  }