const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

router.get(
    '/:senderId/:receiverId',
    messageController.getConversation
);

router.post(
    '/:senderId/:receiverId',
    messageController.createMessage
);

module.exports = router;