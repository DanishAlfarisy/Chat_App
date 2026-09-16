const db = require('../config/database');

async function getConversation(req, res) {
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

   try {
        const [results] = await db.query(
            sql,
            [senderId, receiverId, receiverId, senderId]
        );

        return res.json(results);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Gagal mengambil percakapan'
        });
    }
};
async function createMessage(req, res){
    const senderId = Number(req.params.senderId);
    const receiverId = Number(req.params.receiverId);
    const message = req.body.message;

    const sql = `
        INSERT INTO messages (sender_id, receiver_id, message)
        VALUES (?, ?, ?)
    `;

  try {
        const [result] = await db.query(
            sql,
            [senderId, receiverId, message]
        );

        return res.status(201).json({
            message: 'Pesan berhasil dikirim',
            id: result.insertId
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: 'Gagal mengirim pesan'
        });
    }
};

module.exports = {
    getConversation,
    createMessage
};