const db = require('../config/database');

const getUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: 'Gagal mengambil users'
            });
        }

        res.json(results);
    });
};

const getUserById = (req, res) => {
    const userId = Number(req.params.id);

    const sql = `
        SELECT id, name
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: 'Gagal mengambil user'
            });
        }

        res.json(results[0]);
    });
};

module.exports = {
    getUsers,
    getUserById
};