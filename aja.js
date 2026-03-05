import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: `${process.env.DB_URL}`,
  ssl: {
    rejectUnauthorized: false
  }
  });
const initializeDatabase = async () => {
  console.log('Створюю таблицю movies...');
  
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      director TEXT NOT NULL,
      release_year INTEGER,
      rating NUMERIC
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log('Таблиця готова');
  } catch (error) {
    console.error('Помилка створення таблиці:', error.message);
  }
};

async function getMovies() {
   const { rows } = await pool.query("SELECT * FROM movies");
   console.log("Мої фільми => ", rows);
}

async function addMovie() {
   await pool.query("insert into movies (title, director, release_year, rating) values ('Dune Part Two', 'Denis Villeneuve', 2024, 8.8)");
   console.log("Фільм додано");
}

async function updateMovie() {
   await pool.query("update movies set rating = 9.0 where id = 1");
   console.log("Рейтинг оновлено");
}


async function deleteMovie() {
   await pool.query("delete from movies where id = 2");
   console.log("Фільм видалено");
}

async function run() {
    await initializeDatabase();
}
const command = process.argv[2];

switch(command) {
  case "list": {
    await getMovies
    break;
  }

case "add": {
      await addMovie(); 
      await getMovies();
      break;
    }

case "update":  {
      await updateMovie();
      await getMovies();
      break;
    }

case "delete": {
      await deleteMovie();
      await getMovies(); 
      break;
    }

default: {
      console.log("Usage:    1.node db.js list - khdghjfjhf; 2. node db.js add - pokgfopkhfgpohk; 3. node db.js update - ofkhpgkjh; 4.node db.js delete - [pglkhgfokhfokh.  All commands: help, list, add, update, delete.");
      break;
   }
}
run();