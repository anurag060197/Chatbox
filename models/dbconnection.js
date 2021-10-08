const mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;


// const url = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.czmw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const url = `mongodb+srv://admin565:admin656@cluster0.czmw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connect = mongoose.connect(url, {useNewUrlParser: true})
    .then(()=>{console.log('DB connected');})
    .catch((err)=>{console.log('Error occurred', err);})

module.exports = connect;