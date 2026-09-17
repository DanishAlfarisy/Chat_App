const db = require('../config/database');

async function getUsers(req, res) {
    try {
        const [results] = await db.query(
            'SELECT * FROM users'
        );

        return res.json(results);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Gagal mengambil users'
        });
    }
}

async function  getUserById (req, res){
    const userId = Number(req.params.id);

    const sql = `
        SELECT id, name
        FROM users
        WHERE id = ?
    `;

    try {
        const [results] = await db.query(
            sql,
            [userId]
        );

        return res.json(results[0]);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Gagal mengambil user'
        });
    }
};


module.exports = {
    getUsers,
    getUserById
};