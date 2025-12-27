const db = require('../config/db');

const Transaction = {
  // contains 5 promises - create, findById, findByUserId, findAll, updateStatus.
  create : ({ id, user_id, amount, upi_id, note }) => {
    return new Promise( (resolve, reject) => {
      const query = `
        INSERT INTO transactions (id, user_id, amount, upi_id, note) VALUES (?, ?, ?, ?)
      `;
      db.run(query, [id, user_id, amount, upi_id, note], (err) => {
        if (err) { 
          return reject(err.message);
        };
        resolve({ id, user_id, amount, upi_id, note, status:"PENDING" });
      });
    });
  },

  findById : (id) => {
    return new Promise( (resolve, reject) => {
      if (req.session.user.role === "ADMIN") {
        const query = `SELECT * FROM transactions where id = ?`;
        db.get(query, [id], (err, row) => {
          if (err) {
            return reject(err.message);
          };
          resolve(row||null);
        });
      }
      if (req.session.user.role === "STUDENT") {
        const query = `SELECT * FROM transactions where id = ? AND user_id = ?`;
        db.get(query, [id, req.session.user.id], (err, row) => {
          if (err) {
            return reject(err.message);
          };
          resolve(row||null);
        });
      }
    });
  },

  findByUserId : (user_id) => {
    return new Promise( (resolve, reject) => {
      const query = `SELECT * FROM transactions where user_id = ?`;
      db.all(query, [user_id], (err, rows) => {
        if (err) {
          return reject(err.message);
        };
        resolve(rows);
      });
    });
  },

  findAll : (status = null) => {
    return new Promise( (resolve, reject) => {
      let query = `SELECT * FROM transactions`;
      const params = [];
      if (status) {
        query += ` WHERE status = ?`;
        params.push[status];
      };
      db.all(query, params, (err, rows) => {
        if (err) {
          return reject(err);
        };
        resolve(rows);
      });
    });
  },

  updateStatus : (id, status) => {
    return new Promise( (resolve, reject) => {
      const query = `UPDATE transactions SET status = ? WHERE id = ?`;
      db.run(query, [status, id], (err) => {
        if (err) return reject(err.message);
        resolve();
      });
    });
  }
};

module.exports = Transaction;
