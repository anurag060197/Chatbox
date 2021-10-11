const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
// import Schema
const Msg = require('./models/chatSchema')

app.use(express.json());
// DB connection
// const dotenv = require('dotenv');
// dotenv.config({path: 'config.env'})
const mongoose = require('mongoose');
const mongoDb = 'mongodb+srv://admin565:admin656@cluster0.czmw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoDb, {useNewUrlParser: true}, {useUnifiedTopology: true})
    .then(()=>{
        console.log("connected");
    })
    .catch(err=>{
        console.log("error: " + err);
    })


// router
// const chats = require('./routes/chatRouter');
// app.use('/api/v1', chats);


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/index.html');
})

io.on('connection', (socket)=>{
    Msg.find()
        .then((result)=>{
            socket.emit('output-messages', result)
        })
    let temp;
    socket.on('user connected', (user)=>{
        console.log(user+' connected');
        temp = user;
        const message = new Msg({
            sender: user,
            message: 'joined'
        })
        message.save()
            .then(()=>{
                io.emit('user conneceted', user, 'joined');
            })
    })
    socket.on('disconnect', ()=>{
        console.log(temp+' disconnected');
        const message = new Msg({
            sender: temp,
            message: 'left'
        })
        message.save()
            .then(()=>{
                io.emit('user disconnected', temp, 'left');
            })
    })
    socket.on('chat message', (user, msg)=>{
        const message = new Msg({
            sender: user,
            message: msg
        })
        message.save()
            .then(()=>{
                io.emit('chat message', user, msg);
            })
    })
})

server.listen(3020,()=>{
    console.log("Well done, Listening...");
})