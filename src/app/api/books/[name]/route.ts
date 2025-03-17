'use server'
import { NextResponse, NextRequest } from "next/server";
import fs from 'fs';
import path from 'path';
import { BooksProps } from "@/types";

type PageProps = {
    params: Promise<{ name: string }>,
}
export async function GET(req: NextRequest, { params }: PageProps) {
  try {
      const {name} = await params;
      const decodeName = decodeURIComponent(name)
    const filePath = path.join(process.cwd(), 'src/data', 'books.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const books = JSON.parse(jsonData);
    const book = books.find((b: BooksProps) => b.name.toLowerCase() === decodeName.toLowerCase());
    if (book) {
      return NextResponse.json(book);
    } else {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}