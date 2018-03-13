const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMsg} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app=express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('new user connected');

    socket.emit('newMsg', generateMsg('Admin', 'Welcome'));

    socket.broadcast.emit('newMsg', generateMsg('Admin', 'New user has joined'));

    socket.on('createMsg', (msg, callback) => {
        console.log('createMsg', msg);
        io.emit('newMsg', generateMsg(msg.from, msg.text));
        callback('call and response');
        // socket.broadcast.emit('newMsg',generateMsg(msg.from, msg.text));
    });

    socket.on('disconnect', () =>{
        console.log('user disconnected');
    });
});

server.listen(port, ()=>{
    console.log(`server ${port} started`);
});

module.exports={app};

