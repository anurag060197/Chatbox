const mongoose = require('mongoose');
const schema = mongoose.Schema;

const chatSchema = new schema({
    sender: {
        type: String
    },
    message: {
        type: String
    },
    timeStamp: {
        type: Date,
        default: new Date(Date.now())
    },
});

module.exports = mongoose.model("Chat", chatSchema);