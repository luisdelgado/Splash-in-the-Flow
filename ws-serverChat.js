var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({
    port: 8081,
    path: '/testing'
});

var clients = {};

var id = 0;
var serverRead;

wss.on('connection', function(ws) {
    ws.id = id++;
    
    clients[id] = ws;

    ws.on('message', function(message) {
        send(id, message);
    });
    
    ws.on('close', function(reasonCode, description) {
        delete clients[id];
    });
    
    console.log('new connection');

});


var send = function(id, message){
    Object.keys(clients).forEach(function(key) {
        var client = clients[key];
        client.send(message);
    });

    if (serverRead != undefined) {
    
        serverRead.write("data: " + message + "\n\n");
    }

}


var http = require("http");

http.createServer(function(req, res) {

    res.writeHeader(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Access-Control-Allow-Origin": "*"
    });
    
    var interval = setInterval( function() {

        res.write("data: " + randomInt(100,127) + "\n\n");

    },2000);

}).listen(9091);

console.log('SSE-Server started!');

function randomInt (low, high) {

return Math.floor(Math.random() * (high - low) + low);

}