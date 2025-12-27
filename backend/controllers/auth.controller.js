const bcrypt = require("bcrypt");
const User = require("../models/user");
const db = require("../config/db");


// signup.
// POST api/auth/signup
exports.signup = async (req, res, next) => {
  try{
    const { id, email, password, role } = req.body;
    if(!id || !email || !password ) {
      return res.status(400).json({ success: false, error: "missing required fields." });
    }

    // atp I haven't created any signup method for admins.
    // hence right now there is 1 super admin - me and other students.
    if (!role) {
      role = "STUDENT";
    }

    const hashedPassword = bcrypt.hash(password, 14);

    const query = `INSERT INTO users(id, email, password, role) VALUES(?, ?, ?, ?)`;
    db.run(query, [id, email, hashedPassword, role], (err) => {
      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }
      res.status(200).json({ success: true, message: 'user created successfully.' });
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
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // session = authentication
    req.session.user = {
      id: user.id,
      role: user.role,
    };

    res.json({
      success: true,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};
