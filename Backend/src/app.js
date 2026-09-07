 const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

module.exports = app;