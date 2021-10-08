const Chat = require('../models/chatSchema');

exports.getChats = async (req, res, next) => {
    try {
        const chat = await Chat.find();
        res.status(200).json({
            status: 'success',
            data: {chat}
        })
    } catch (err) {
        // console.log("error "+ err);
        res.status(400).json({
            status: 'error',
            err
        })
    }
}

exports.addChat = async (req, res, next) => {
    try {
        const chat = await Chat.create(req.body);
        // console.log("addcaht ");
        res.status(200).json({
            status: 'success',
            data: {chat}
        })
    } catch (err) {
        // console.log("error "+ err);
        res.status(400).json({
            status: 'error',
            err
        })
    }   
}