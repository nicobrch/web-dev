import db from "../utils/db.js"

export const createUser = (username, hashedPassword) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

export const getUser = (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        resolve(null);
      } else {
        resolve(user);
      }
    });
  });
};