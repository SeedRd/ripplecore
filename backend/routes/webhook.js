const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webook.controller");

// POST /api/webhooks/payment
router.post("/payment", allowRoles("ADMIN"), webhookController.paymentWebhook);

module.exports = router;
