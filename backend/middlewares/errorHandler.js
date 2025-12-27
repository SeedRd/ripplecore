const errorHandler = (err, req, res, next) => {
  console.error("an unexpected error occured : ", err.stack);

  const statusCode = err.statusCode || 514;
  const message = err.message || "unexpected error : try again later.";

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

module.exports = errorHandler;
