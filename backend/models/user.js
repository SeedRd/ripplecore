// user table ke sabhi SQL operations yhi honge.

const db = require('../config/db');

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    })
}

exports.findById = (id) => {
    return new Promise((resolve, reject) => {
        db.get("SELECT id, email, role FROM users WHERE id = ?", [id], (err, row) => {
            if (err) return reject(err);
            resolve(row);
        }
        );
    })
}