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
    var a = jQuery(" <a target='_blank'>curr loc</a>");
    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#msgRecd').append(li);
});

var msgInput=jQuery('[name=msg]')

jQuery('#msgForm').on('submit', function(e){
   e.preventDefault(); 
    socket.emit('createMsg', {
        from: 'newUser', text: msgInput.val()
    }, function(res){
        jQuery(msgInput).val('');
        //console.log('msg rec\'d', res);
    });
});

var locBtn = jQuery('#locBtn');
locBtn.on('click', function () {
    if (!navigator.geolocation) {
        return alert('geoLoc not supported');
    }
    locBtn.attr('disabled', 'disabled').text('locating...');
    navigator.geolocation.getCurrentPosition(function (position) {
        locBtn.removeAttr('disabled',).text('send loc');
        socket.emit('createLocMsg', {
            lat: position.coords.latitude, 
            lon: position.coords.longitude
        });
    }, function () {
        locBtn.removeAttr('disabled').text('send loc');
        alert('unable to fetch loc');
    });
});