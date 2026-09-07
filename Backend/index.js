const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'latihan_nodejs'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung:', err);
        return;
    }

    console.log('MySQL berhasil terhubung!');
});

app.get('/', (req, res) => {
    res.send('Chat App berjalan!');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        res.json(results);
    });
});

app.post('/messages/:senderId/:receiverId', (req, res) => {
    const senderId = Number(req.params.senderId);
    const receiverId = Number(req.params.receiverId);
    const  message  = req.body.message;

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
});

app.get('/messages/:senderId/:receiverId', (req, res) => {

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
});

app.get('/users/:id', (req, res) => {
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
});

/*app.get('/messages', (req, res) =>{
    db.query('SELECT * FROM messages', (err, results) => {
        res.json(results);
    });
});*/

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});

