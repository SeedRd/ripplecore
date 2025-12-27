const Transaction = require("../models/transaction");
const PaymentLog = require("../models/paymentLog");

const generateTransactionId = require("../utils/generateTransactionId");
const generateQRCode = require("../utils/qrGenerator");
const logger = require("../utils/logger");


// create a new payment transaction.
// POST /api/transactions/create
exports.createTransaction = async (req, res, next) => {
  try {
    const { amount, upi_id, note } = req.body;
    const user_id = req.session.user.id;

    const transaction_id = generateTransactionId();
    const payload = `upi://pay?pa=${upi_id}&am=${amount}&cu=INR&tn=${note || ""}&tr=${transaction_id}`;
    const qrCode = await generateQRCode(payload);

    await Transaction.create({
      id: transaction_id,
      user_id: user_id,
      amount : Number(amount),
      upi_id : upi_id,
      note: note || null,
      status: "PENDING"
    });

    logger(transaction_id, "PENDING");

    res.status(201).json({
      success: true,
      transaction_id,
      qrCode,
      status: "PENDING",
    });
  } catch (err) {
    next(err);
  }
};

// get all transactions.
// GET /api/transactions
exports.getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};


// get a single transaction by ID.
// GET /api/transactions/:id
exports.getTransactionById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (err) {
    next(err);
  }
};

//
exports.getTransactionByUserId = async (req, res, next) => {
  try {
    const user_id = req.session.user.id;

    const transactions = await Transaction.findByUserId(user_id);
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
}


// Get status history for a transaction
// GET /api/transactions/:id/status
exports.getTransactionStatusLogs = async (req, res, next) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const logs = await PaymentLog.findByTransactionId(id);

    res.status(200).json({
      transaction_id: id,
      status_logs: logs,
    });
  } catch (err) {
    next(err);
  }
};
