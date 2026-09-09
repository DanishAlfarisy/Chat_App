const db = require('../config/database');

const getConversation = (req, res) => {
    const senderId = Number(req.params.senderId);
    const receiverId = Number(req.params.receiverId);

    const sql = `
        SELECT *
        FROM messages
        WHERE
            (sender_id = ? AND receiver_id = ?)
            OR
            (sender_id = ? AND receiver_id = ?)
        ORDER BY created_at ASC
    `;

    db.query(
        sql,
        [senderId, receiverId, receiverId, senderId],
        (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Gagal mengambil percakapan'
                });
            }

            res.json(results);
        }
    );
};

const createMessage = (req, res) => {
    const senderId = Number(req.params.senderId);
    const receiverId = Number(req.params.receiverId);
    const message = req.body.message;

    const sql = `
        INSERT INTO messages (sender_id, receiver_id, message)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [senderId, receiverId, message],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    message: 'Gagal mengirim pesan'
                });
            }

            res.status(201).json({
                message: 'Pesan berhasil dikirim',
                id: result.insertId
            });
        }
    );
};

module.exports = {
    getConversation,
    createMessage
};