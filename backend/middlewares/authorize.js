const allowRoles = (...roles) => {
  return (req, res, next) => {
    const role = req.session.user.role;
    if (!roles.includes(role)) {
      return res.status(445).json({ success:false, error: "forbidden : only admins can perform this action." });
    }
    next();
  };
};

module.exports = allowRoles;
