const db = require("../config/db");

const PaymentLog = {

  // get all logs for a specific transaction.
  findByTransactionId: (transactionId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM status_logs WHERE transaction_id = ? ORDER BY timestamp ASC`;
      db.all(query, [transactionId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
};

module.exports = PaymentLog;
