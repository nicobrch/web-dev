import db from "utils/db.js"

export const createUser = async (username, hashedPassword) => {
  return await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
}

export const getUser = async (username) => {
  return await db.get('SELECT * FROM users WHERE username = ?', [username]);
}