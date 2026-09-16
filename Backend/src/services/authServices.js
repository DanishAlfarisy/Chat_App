const bcrypt = require('bcrypt');
const db = require('../config/database');

async function registerUser(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `;

        const [result] = await db.query(
        sql, [name, email, hashedPassword]
    );

    return result;
}



async function loginUser(email, password) {
    const [users] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    if (users.length === 0) {
        return null;
    }

    const user = users[0];

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return null;
    }

    return user;
}


module.exports = {
    registerUser,
    loginUser
};