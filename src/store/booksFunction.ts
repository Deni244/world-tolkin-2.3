
import { BooksProps } from "@/types";


export async function GetBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`,{
      method: 'GET',
      //next: {revalidate: 60}
      cache: "no-store"
    });
    const books = await res.json();
    return books;
  }

export async function GetOneBook(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${name}`,{
    method: 'GET',
    cache: "no-store"
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

  export async function editBook(book: BooksProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: book.id,
        name: book.name,
        description: book.description,
        photo: book.photo,
        price: book.price
      }),
    })
    const result = await res.json();
    return result;
  }