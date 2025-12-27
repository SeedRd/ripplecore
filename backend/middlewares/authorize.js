// use for authorization in routes.

const allowRoles = (...roles) => {
  return (req, res, next) => {
    const { role } = req.session.user;
    if (!roles.includes(role)) {
      return res.status(403).json({ error: "forbidden : go complete your sleep." });
    }
    next();
  };
};

module.exports = allowRoles;
