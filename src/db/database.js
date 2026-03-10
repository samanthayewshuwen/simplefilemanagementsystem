const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'notes.db'), (err) => {
  if (err) return console.error('DB connect error:', err.message);
  console.log('Connected to SQLite database.');

  // Create notes table with image & created_at
  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    image TEXT,
    created_at TEXT NOT NULL
  )`);
});

module.exports = db;