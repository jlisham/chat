const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMsg, createLocMsg} = require('./utils/message');
const {isRealStr} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app=express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{

    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if (!isRealStr(params.name) || !isRealStr(params.room)){
          return  callback('moniker and room are required');
        }
        socket.join(params.room);
        users.delUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        //socket.leave(params.room);
        // io.emit==>all users
            //io.to('room')
        // socket.broadcast==>all but user
            //socket.broadcast.to('room');
        // socket.emit==>current user only
        socket.emit('newMsg', generateMsg('Admin', `Welcome, ${params.name}`));
        socket.broadcast.to(params.room).emit('newMsg', generateMsg('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('createMsg', (msg, callback) => {
        console.log('createMsg', msg);
        io.emit('newMsg', generateMsg(msg.from, msg.text));
        callback('call and response');
        // socket.broadcast.emit('newMsg',generateMsg(msg.from, msg.text));
    });

    socket.on('createLocMsg', (coords) => {
        io.emit('newLocMsg', generateLocMsg(params.name, coords.lat, coords.lon));
    });

    socket.on('disconnect', () =>{
        var user = users.delUser(socket.id);
        if (user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMsg', generateMsg('Admin', `${user.name} has left the room`));
        }
    });
});

server.listen(port, ()=>{
    console.log(`server ${port} started`);
});

module.exports={app};

