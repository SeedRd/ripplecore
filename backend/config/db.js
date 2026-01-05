const sqlite3 = require('sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'db', 'ripplecore.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error('some error occured : ', err.message);
  }
  console.log('database connected.');
});

db.serialize(() => {
  db.run("PRAGMA foreign_keys = ON");

  db.run(`CREATE TABLE IF NOT EXISTS users(
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          role TEXT CHECK (role IN ('ADMIN', 'STUDENT')))`);

  db.run(`CREATE TABLE IF NOT EXISTS transactions(
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        amount REAL NOT NULL,
        upi_id TEXT NOT NULL,
        note TEXT,
        status TEXT DEFAULT 'PENDING'
          CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

  db.run(`CREATE TABLE IF NOT EXISTS status_logs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        transaction_id TEXT NOT NULL,
        status TEXT NOT NULL
          CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED')),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (transaction_id) REFERENCES transactions(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

});

module.exports = db; // now 'db' can be called in require of other modules.
