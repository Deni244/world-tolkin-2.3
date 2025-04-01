
import { BooksProps } from "@/types";


export async function GetBooks() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`,{
      method: 'GET',
      next: {revalidate: 60}
    //cache: 'no-cache'
    });
    if (!res.ok) throw new Error('Неправильний фетч')
    const books = await res.json();
    return books;
  }

export async function GetOneBook(name: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${name}`,{
    method: 'GET',
    next: {revalidate: 60}
    //cache: "no-store"
  });
  if (!res.ok) throw new Error('Неправильний фетч')
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

  export async function editBook(book: Omit<BooksProps, 'photo'> & {photo: string | File;}) {
    const formData = new FormData();
    formData.append('id', book.id!);
    formData.append('name', book.name);
    formData.append('description', book.description);
    formData.append('price', book.price);
    formData.append('photo', book.photo);
    console.log(formData);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books`, {
      method: 'PUT',
      body: formData,
    })
    console.log(res);
    
    const result = await res.json();
    return result;
  }