var socket = io();
socket.on('connect', function (){
    console.log('connected to server');
});

socket.on('disconnect', function (){
    console.log('disconnected from server');
});

socket.on('newMsg', function(msg){
    console.log('newMsg', msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#msgRecd').append(li);
});

jQuery('#msgForm').on('submit', function(e){
   e.preventDefault(); 
    socket.emit('createMsg', {
        from: 'newUser', text: jQuery('[name=msg]').val()
    }, function(res){
        //console.log('msg rec\'d', res);
    });
});