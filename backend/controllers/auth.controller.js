const bcrypt = require("bcrypt");
const User = require("../models/user");
const db = require("../config/db");


// signup.
// POST api/auth/signup
exports.signup = async (req, res, next) => {
  try{
    const { id, name, email, password, role } = req.body;
    if(!id || !name || !email || !password ) {
      return res.status(400).json({ success: false, error: "missing required fields." });
    }

    // atp I haven't created any signup method for admins.
    // hence right now there is 1 super admin - me and other students.
    // if (!role) {
    //   role = "STUDENT";
    // }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `INSERT INTO users(id, name, email, password, role) VALUES(?, ?, ?, ?, ?)`;
    db.run(query, [id, name, email, hashedPassword, role], (err) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({ success: false, error: err.message });
      }
      res.status(201).json({ success: true, message: 'user created successfully.' });
    });
    
  } catch (err) {
    next(err);
  }
} 
 

// login.
// POST api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "invalid email credentials." });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log(user.password);
      return res.status(490).json({ error: "invalid credentials." });
    }

    // after signup, we displau the sign-in page.
    req.session.user = {
      id: user.id,
      role: user.role,
    };

    res.json({
      success: true,
      id: user.id,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    next(err);
  }
};


// logout.
// POST api/auth/logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({
      success: true,
      message: 'logged out successfully.'
    })
  })
}


// get current user.
// GET api/auth/me
exports.me = (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
};
