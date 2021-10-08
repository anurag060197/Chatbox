const express = require('express');
const router = express.Router();

const {getChats, addChat} = require('../controller/chatController');

router
    .route('/chat')
    .get(getChats)
    .post(addChat)

module.exports = router;