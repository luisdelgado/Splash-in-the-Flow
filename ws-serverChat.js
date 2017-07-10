var allOptions;
var users;
var user;
var idMax;
var resposta = "certo";

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

    idMax = id;
    
    clients[id] = ws;

    ws.on('message', function(message) {
        send(id, message);
    });
    
    ws.on('close', function(reasonCode, description) {
        //delete clients[id];
    });
    
    console.log('new connection');
});


var send = function(id, message){
    
    Object.keys(clients).forEach(function(key) {
            var client = clients[key];
            client.send(message, function(error){
                if (error) {
                    console.log("erro");
                    resposta = "erro";
                }
            });
    });

    console.log(resposta);

    if (resposta == "erro") {

        if (serverRead != undefined) {
    
            serverRead.write("data: erro" + "\n\n");
        }

        resposta = "certo";

    } else {

        if (serverRead != undefined) {
    
            serverRead.write("data: " + message + "\n\n");
        }
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

        allOptions = readServer();

        res.write("data: " + allOptions + "\n\n");

    },5000);

}).listen(9091);

console.log('SSE-Server started!');

function randomInt (low, high) {

return Math.floor(Math.random() * (high - low) + low);

}

function readServer() {
    fs = require('fs');
    fs.readFile('./serverDiscussion.js', 'utf8', function (err,data) {
    if (err) {
        throw err;
    } else {
        allOptions = data;
    }
    });
    fs.readFile('./server.js', 'utf8', function (err,data) {
    if (err) {
        throw err;
    }
    users = data;
    });
    if (allOptions != undefined) {
        var final = 0;
        var atual;
        var preString;
        var posString;
        for (contador = 0; final < 6; contador++) {
            atual = allOptions.substring(contador,contador+1);
            if (atual == ";" ) {
                final++;
                preString = allOptions.substring(0,contador+1);
                atual = "+";
                posString = allOptions.substring(contador+3, allOptions.length);
                allOptions = preString + atual + posString;
            }
        }
    }
    return allOptions;
}