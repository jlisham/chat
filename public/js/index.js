var socket = io();
socket.on('connect', function (){
    console.log('connected to server');
});

socket.on('disconnect', function (){
    console.log('disconnected from server');
});

socket.on('newMsg', function(msg){
    //console.log('newMsg', msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);
    jQuery('#msgRecd').append(li);
});

socket.on('newLocMsg', function (msg){
    var li = jQuery('<li></li>');
    var a = jQuery("<a target='_blank'>curr loc</a>");
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
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

var locBtn = jQuery('#locBtn');
locBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('geoLoc not supported');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocMsg', {
            lat: position.coords.latitude, 
            lon: position.coords.longitude
        });
    }, function () {
        alert('unable to fetch loc');
    });
});