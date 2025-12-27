const Transaction = require("../models/transaction");
const logger = require("../utils/logger");

exports.paymentWebhook = async (req, res, next) => {
  try {
    const { transaction_id, status } = req.body;

    if (!transaction_id || !status) {
      return res.status(400).json({ error: "transaction_id and status are required" });
    }

    const allowedStatuses = ["SUCCESS", "FAILED"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: `status must be one of ${allowedStatuses.join(", ")}` });
    }

    const txn = await Transaction.findById(transaction_id);
    if (!txn) {
      return res.status(400).json({ error: "Transaction not found" });
    }

    await Transaction.updateStatus(transaction_id, status);

    // logging the updated status.
    logger(transaction_id, status);

    res.status(200).json({
      success: true,
      message: `Transaction ${transaction_id} updated to ${status}`,
    });
  } catch (err) {
    next(err);
  }
};
