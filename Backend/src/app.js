const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
});


const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');



app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

module.exports = { app,server, io };
