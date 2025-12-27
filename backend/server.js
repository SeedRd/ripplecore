const express = require('express');
const server = express();

const path = require('path');
const cors = require('cors');

// some useful middlewares.
server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


// setting up cookies and sessions.
const session = require("express-session");
const cookieParser = require("cookie-parser");

server.use(cookieParser());
server.use(
  session({
    secret: process.env.SESSION_SECRET || 'sh1ncH@nn0h@₹@@',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true in HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);


// request validation middleware.
const validateRequests = require('./middlewares/validateRequests');
server.use(validateRequests);


// code for routes .
const pingRoutes = require('./routes/ping');
const webhookRoutes = require('./routes/webhook');
const transactionRoutes = require('./routes/transactions');
const authRoutes = require('./routes/auth');

server.use("/api/ping", pingRoutes);
server.use("/api/transactions", transactionRoutes);
server.use("/api/webhooks", webhookRoutes);
server.use("/api/auth", authRoutes);


// catch-all route for undefined routes.
server.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'API route not found.'
  });
});

// error handling middleware.
const errorHandler = require('./middlewares/errorHandler');
server.use(errorHandler);

// starting the server.
const { PORT } = require(path.join(__dirname, 'config', 'env'));
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
