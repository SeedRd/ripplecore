const User = require("../models/user");

module.exports = async function authenticate(req, res, next) {
  try {
    if (!req.session.user.id) {
      return res.status(444).json({ error: 'unauthenticated.' });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(444).json({ error: 'invalid session.' });
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
