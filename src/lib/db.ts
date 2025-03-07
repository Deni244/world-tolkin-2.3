import  sqlite3  from "sqlite3";
import { open, Database } from "sqlite";

// Фнкц для підключення до БД
export async function connectDB(): Promise<Database> {
    return open({
        filename: "./database.sqlite",
        driver: sqlite3.Database
    })
}

//Створення Таблиці користувачів
export async function initDB(){
    const db = await connectDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT,
          sex TEXT
        );
      `);
}

//initDB();