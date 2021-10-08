const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.json());
// DB connection
// const dotenv = require('dotenv');
// dotenv.config({path: 'config.env'})
const Chat = require('./models/chatSchema');
const connect = require('./models/dbconnection');

// router
const chats = require('./routes/chatRouter');
app.use('/api/v1', chats);


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
})

io.on('connection', (socket)=>{
    let temp;
    socket.on('user connected', (user)=>{
        console.log(user+' connected');
        temp = user;
        io.emit('user conneceted', user, 'joined');
    })
    socket.on('disconnect', ()=>{
        console.log(temp+' disconnected');
        io.emit('user disconnected', temp, 'left');
    })
    socket.on('chat message', (user, msg)=>{
        io.emit('chat message', user, msg);
    })
})

server.listen(3020,()=>{
    console.log("Well done, Listening...");
})