// util function to generate a unique transaction ID.
function generateTransactionId(prefix = 'TXN') {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}-${timestamp}-${randomNum}`;
}

module.exports = generateTransactionId;
