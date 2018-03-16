var socket = io();
socket.on('connect', function (){
    console.log('connected to server');
});

function scroll2Bottom(){
    //selectors
    var msgs = jQuery('#msgRecd');
    var newMsg = msgs.children('li:last-child');
    //heights
    var clientHt = msgs.prop('clientHeight');
    var scrollTop = msgs.prop('scrollTop');
    var newMsgHt = newMsg.innerHeight();
    var lastMsgHt = newMsg.prev().innerHeight();
    var scrollHt = msgs.prop('scrollHeight');
    if ((clientHt + scrollTop + newMsgHt + lastMsgHt)>=scrollHt){
        msgs.scrollTop(scrollHt);
    }
}

socket.on('disconnect', function (){
    console.log('disconnected from server');
});

socket.on('newMsg', function(msg){
    var formatTime = moment(msg.created).format('h:mm a');
    var template= jQuery('#msgTemplate').html();
    var html=Mustache.render(template, {text:msg.text, from: msg.from, created: formatTime});
    jQuery('#msgRecd').append(html);
    scroll2Bottom();
    // var li = jQuery('<li></li>');
    // li.text(`${msg.from} ${formatTime}: ${msg.text}`);
    // jQuery('#msgRecd').append(li);
});

socket.on('newLocMsg', function (msg){
    var formatTime = moment(msg.created).format('h:mm a');
    var template= jQuery('#msgLocTemplate').html();
    var html=Mustache.render(template, {url:msg.url, from: msg.from, created: formatTime});
    jQuery('#msgRecd').append(html);
    scroll2Bottom();
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