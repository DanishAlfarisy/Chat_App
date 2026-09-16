const bcrypt = require('bcrypt');
const db = require('../config/database');

function registerUser(name, email, password, callback) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return callback(err, null);
        }

        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                callback(null, result);
            }
        );
    });
}


function loginUser(email, password, callback) {

    // 1. Cari user berdasarkan email
    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, users) => {

            if (err) {
                return callback(err, null);
            }

            // 2. User tidak ditemukan
            if (users.length === 0) {
                return callback(null, null);
            }

            // 3. Ambil user
            const user = users[0];

            // 4. Bandingkan password
            bcrypt.compare(
                password,
                user.password,
                (err, passwordMatch) => {

                    if (err) {
                        return callback(err, null);
                    }

                    // 5. Password salah
                    if (!passwordMatch) {
                        return callback(null, null);
                    }

                    // 6. Login berhasil
                    callback(null, user);
                }
            );
        }
    );
}


module.exports = {
    registerUser,
    loginUser
};