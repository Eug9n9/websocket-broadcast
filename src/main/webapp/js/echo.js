var wsUrl = 'ws://' + window.location.hostname + ':8080/websocket-broadcast/echo';

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
    $("textarea#outputMessage").val(event.data);
};

$("button#messageSubmit").on('click',function(){
    var message = $('textarea#inputMessage').val();
    console.log('Sending message: ' + message);
    ws.send(message);
});

