"use server";
import { neon } from "@neondatabase/serverless";

export async function createTable() {
    const sql = neon(process.env.DATABASE_URL !);
  
     await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE,
        password TEXT,
        sex TEXT
      );
    `;
    
    console.log("Table created successfully!");
  }
