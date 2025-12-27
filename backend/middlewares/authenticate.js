module.exports = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(444).json({ error: "not authenticated." });
  }
  next();
};
