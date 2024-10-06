import sqlite3 from "sqlite3";

const dbPromise = open({
  filename: './db.sqlite',
  driver: sqlite3.Database
});

const initDB = async () => {
  const db = await dbPromise;
  await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
};

initDB().then(r => console.log(r));

const db = await dbPromise;

export default db;