var wsUrl = 'ws://' + window.location.hostname + ':8080/websocket-broadcast/broadcast';

console.log('WebSockets Url : ' + wsUrl);

var ws = new WebSocket(wsUrl);

ws.onopen = function(event){
    console.log('WebSocket connection started');
};

ws.onclose = function(event){
    console.log("Remote host closed or refused WebSocket connection");
    console.log(event);
};

ws.onmessage = function(event){
    console.log('Receiving message: ' + event.data);
    if (event.data.indexOf("Local:") === 0) {
        $("textarea#localMessage").val(event.data);
    } else {
        console.log('Publishing message: ' + event.data);

        // publish a new remote message:
        channel.publish("remote", {
            message: event.data
        });
    }
};

$("button#messageSubmit").on('click',function(){
    var message = $('textarea#inputMessage').val();
    console.log('Sending message: ' + message);
    ws.send(message);
    $("textarea#inputMessage").val("");
});

// get a handle to the default postal channel
var channel = postal.channel();

// subscribe to 'remote' topic
var subscription = channel.subscribe("remote", function(data) {
    console.log('Receiving published message: ' + data.message);
    $("textarea#outputMessage").val(data.message);
});
