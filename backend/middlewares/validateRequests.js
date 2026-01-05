const validateRequests = (req, res, next) => {
  if (["POST", "PUT"].includes(req.method)) {
    if (!req.is("application/json")) {
      return res.status(414).json({
        success: false,
        error: "invalid content type : kindly post application/json."
      });
    }
  };

  // POST /api/transactions/create
  if ( req.method === "POST" && req.path === "/create" ) {
    const { amount, upi_id, note } = req.body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res.status(415).json({
        error: "please enter a valid amount (greater than 0).",
      });
    };

    if (!upi_id || typeof upi_id !== "string") {
      return res.status(416).json({
        error: "Invalid or missing UPI ID",
      });
    };
  };

  // POST /api/webhook/payment
  if (req.method === "POST" && req.body.status) {
    const { status } = req.body;

    const allowedStatuses = ["PENDING", "SUCCESS", "FAILED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(440).json({
        error: "Invalid status value - should be one of PENDING, SUCCESS, FAILED.",
      });
    }
  };

  next();
};

module.exports = validateRequests;
