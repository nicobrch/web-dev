import sqlite3 from "sqlite3";

const DB_SOURCE = "db.sqlite"

const db = new sqlite3.Database(DB_SOURCE, async (err) => {
  if (err) throw err;
  console.log(`Connected to ${DB_SOURCE} database 🎉`);
  initDb();
});

const initDb = () => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
}

export default db;