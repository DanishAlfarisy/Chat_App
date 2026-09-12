const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});

io.on('connection', (socket) => {
    console.log('User terhubung:', socket.id);

    socket.on('send_message', (data) => {
        console.log('RECEIVED SOCKET:', data);

       io.emit('new_message', {
        sender_id: data.senderId,
        receiver_id: data.receiverId,
        message: data.message
    });
    });

    socket.on('disconnect', () => {
        console.log('User terputus:', socket.id);
    });
});

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

module.exports = { app, server, io };