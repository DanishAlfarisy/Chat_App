const bcrypt = require('bcrypt');
const db = require('../config/database');

async function registerUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
        db.query(
            sql,
            [name, email, hashedPassword],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(result);
            }
        );
    });
}

module.exports = {
    registerUser
};