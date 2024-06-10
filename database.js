const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY,
    name TEXT,
    score INTEGER,
    age INTEGER,
    city TEXT,
    gender TEXT
  )`);
});

module.exports = db;
