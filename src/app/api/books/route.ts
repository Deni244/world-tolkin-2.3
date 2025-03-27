'use server'
import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { BooksProps } from "@/types";
//Шлях до файлу json
const filePath = path.join(process.cwd(), 'src/data', 'books.json');
//Шлях до фотографій
const uploadDirPhoto = path.join(process.cwd(), 'public/books');

export async function GET() {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const books = JSON.parse(jsonData);
    return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
    const { name, description, photo, price } = await req.json();
    try {
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const books = JSON.parse(jsonData);
      const id = books.length + 1;
      const newBook = { id: id , name, description, photo, price };
      books.push(newBook);
  
      fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf-8');
      return NextResponse.json({message: 'Книга Успішно збережена!', status: 200});
    } catch (error) {
      return NextResponse.error();
    }
  }

  export async function DELETE(req: NextRequest) {
      const {id} = await req.json();
      try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        let books = JSON.parse(jsonData);
        const bookIndex = books.findIndex((book: BooksProps) => book.id === id);
        
        if (bookIndex === -1) {
          return NextResponse.json({succes: 'false', message: 'щось не так'});
        }
        const imagePath = path.join(process.cwd(), "public", books[bookIndex].photo);
    
      if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
        await books.splice(bookIndex, 1);
        books.map((book: BooksProps, index: number) => {
          book.id = (index + 1).toString();
        });
        
        fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf-8');
        return NextResponse.json({succes: 'true', message: 'Книга успішно видалена!'});
      } catch (error) {
        return NextResponse.json({succes: 'false', message: `server error ${error}`});
      }
  }

  export async function PUT(req: NextRequest) {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    let photo = formData.get('photo');
    
    let newPhotoPath = '';
    try { 
      if (photo instanceof File){ 
      const filePath = path.join(process.cwd(), 'public', 'books', photo.name);
      const bytes = await photo.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(bytes));
      newPhotoPath = `/books/${photo.name}`;
      
      }else {
        photo = formData.get('photo') as string;
        newPhotoPath = photo;
      }
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      let books = JSON.parse(jsonData);
      books = books.map((book: BooksProps) => {
        if (book.id === id) {
          if (book.photo !== newPhotoPath && book.photo !== '') {
            const oldPhotoPath = path.join(process.cwd(), 'public', book.photo);
            if (fs.existsSync(oldPhotoPath)) {
              fs.unlinkSync(oldPhotoPath);
            }
          }
          return {...book, name, description, price, photo: newPhotoPath };
        }
        return book;
      });
      fs.writeFileSync(filePath, JSON.stringify(books, null, 2));

      return NextResponse.json({succes: 'true', message: 'Дані Успішно оновлено!'});
      
    } catch (error) {
      return NextResponse.json({succes: 'false', message: `server error ${error}`});
    }
 
  }