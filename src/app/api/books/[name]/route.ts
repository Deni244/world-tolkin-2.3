'use server'
import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { BooksProps } from "@/types";
const filePath = path.join(process.cwd(), 'src/data', 'books.json');
type PageProps = {
    params: Promise<{ name: string }>,
}
export async function GET(req: NextRequest, { params }: PageProps) {
  try {
      const {name} = await params;
      const decodeName = decodeURIComponent(name); 
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const books = JSON.parse(jsonData);
    const book = books.find((b: BooksProps) => b.name.toLowerCase() === decodeName.toLowerCase());
    if (book) {
      return NextResponse.json({book: book});
    } else {
      return NextResponse.json({book: null, message: 'Book not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({book: null, message: `Internal Server Error ${error}` }, { status: 500 });
  }
}

