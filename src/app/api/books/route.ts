'use server'
import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { BooksProps } from "@/types";

export async function GET() {
    const filePath = path.join(process.cwd(), 'src/data', 'books.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const books = JSON.parse(jsonData);
    return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
    const { name, description, photo, price } = await req.json();
    const filePath = path.join(process.cwd(), 'src/data', 'books.json');
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
      const filePath = path.join(process.cwd(), 'src/data', 'books.json');
      try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const books = JSON.parse(jsonData);
        const bookIndex = books.findIndex((book: BooksProps) => book.id === id);
        
        if (bookIndex === -1) {
          return NextResponse.json({succes: 'false', message: 'щось не так'});
        }
        const imagePath = path.join(process.cwd(), "public", books[bookIndex].photo);
        console.log(imagePath);
    
      if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
        await books.splice(bookIndex, 1);
        
        fs.writeFileSync(filePath, JSON.stringify(books, null, 2), 'utf-8');
        return NextResponse.json({succes: 'true', message: 'Книга успішно видалена!'});
      } catch (error) {
        return NextResponse.json({succes: 'false', message: `server error ${error}`});
      }
  }