// util function to log status messages to status_logs table.
const db = require("../config/db");

const logStatus = (user_id, transaction_id, status) => {

  return new Promise((resolve, reject) => {

    const permittedStatus = ['PENDING', 'FAILED', 'SUCCESS'];
    if (!permittedStatus.includes(status)) {
      return reject(new Error('invalid status - must be one of FAILED, SUCCESS, PENDING.'));
    }

    const query = `
      INSERT INTO status_logs (user_id, transaction_id, status) VALUES (?, ?, ?)
    `;
    db.run(query, [user_id, transaction_id, status], (err) => {
      if (err) {
        console.error('failed to log status : ', err.message);
        return reject(err);
      }

      console.log(`logged status "${status}" for transaction id "${transaction_id}", payee id "${user_id}" at ${new Date().toISOString()}.`);

      resolve(true);
    })
  })
}
module.exports = logStatus;
