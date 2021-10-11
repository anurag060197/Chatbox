const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Msg", msgSchema);