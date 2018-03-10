var socket = io();
socket.on('connect', function (){
    console.log('connected to server');

    socket.emit('createMsg', {
        from: "fakeUser",
        text: 'more content'
    });
});

socket.on('disconnect', function (){
    console.log('disconnected from server');
});

socket.on('newMsg', function(msg){
    console.log('newMsg', msg);
});