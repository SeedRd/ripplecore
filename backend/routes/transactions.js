const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactions.controller");
const authenticate = require("../middlewares/authenticate");
const { allowRoles } = require("../middlewares/authorize");

// POST /api/transactions/create
router.post("/create", authenticate, allowRoles("STUDENT"), transactionsController.createTransaction);

// GET /api/transactions
router.get("/", authenticate, allowRoles("ADMIN"), transactionsController.getAllTransactions);

// GET /api/transactions/:id
router.get("/:id", transactionsController.getTransactionById);

// GET /api/transactions/:id/status
router.get("/:id/status", transactionsController.getTransactionStatusLogs);

module.exports = router;
