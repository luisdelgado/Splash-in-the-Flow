var allOptions;
var users;
var user;
var idMax;
var resposta = "certo";
var connected = "";

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
        var exist = message.indexOf("user") !== -1;
        var delet = message.indexOf("logout") !== -1;
        var deletOlder = message.indexOf("exitOther") !== -1;
        var deletErro = message.indexOf("exitErro") !== -1;

        if (delet) {
            var preIndex = message.indexOf("-");
            var fimIndex = message.length;
            var id = message.substring(preIndex+1, fimIndex);
            connected = connected.replace(message.substring(8, message.length) + ", ", '');
			console.log(connected);
            var isId = connected.indexOf(id) !== -1;
            if (isId) {
                ws.send("deleted");
            } else {
                ws.send("last");
            }
        }
        if (deletOlder) {
            var preIndex = message.indexOf("-");
            var fimIndex = message.length;
            var id = message.substring(preIndex+1, fimIndex);
            connected = connected.replace(message.substring(11, message.length) + ", ", '');
			console.log(connected);
            var isId = connected.indexOf(id) !== -1;
            if (isId) {
            } else {
                ws.send("lastOld");
            }
        }
        if (deletErro) {
            var preIndex = message.indexOf("-");
            var fimIndex = message.length;
            var id = message.substring(preIndex+1, fimIndex);
            connected = connected.replace(message.substring(6, message.length) + ", ", '');
			console.log(connected);
        }
        if (exist) {
            connected = connected + message.substring(6, message.length) + ", ";
			console.log(connected);
        } else {
            var delet = message.indexOf("exit") !== -1;
            if (delet) {

            } else {
                send(id, message);
            }
        }
    });
    
    ws.on('close', function(reasonCode, description) {
        
    });
    
    console.log('new connection');
});


var send = function(id, message){
    
    Object.keys(clients).forEach(function(key) {
            var client = clients[key];
            client.send(message, function(error){
                if (error) {
                    resposta = "erro";
                }
            });
    });

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