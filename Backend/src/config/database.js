const mysql = require('mysql2');

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

module.exports = db;