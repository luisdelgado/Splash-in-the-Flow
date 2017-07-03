// Criação de variáveis
var WebSocketServer = require('ws').Server;
var users;
var name;
var user;
var options;
var resposta;
readServer();

wss = new WebSocketServer({port: 8080, path: '/testing'});

wss.on('connection', function(ws) {

	ws.on('message', function(message) {

		var exist = message.indexOf("login") !== -1;

		console.log('Msg received in server: %s ', message);

		if (exist) {

			user = message.substr(message.indexOf(": ")+2);
			resposta = verificationLogin();
			ws.send(resposta);

		} else {

			var virgula = message.indexOf(",")
			name = message.slice(10, virgula);
			var optionsSelected = message.indexOf("options: "); 
			user = message.slice(virgula+2, optionsSelected-2);
			options = message.slice((optionsSelected+9), message.length);
			resposta = createNewUser();
			readServer();
			ws.send(resposta);

		}

	});

	console.log('new connection');

});

function verificationLogin() {
	var exist = users.indexOf(user) !== -1;


	if (exist) {
		var fs = require('fs');

		fs.appendFile('./signed-in.js', ("user: '" + user + "'; "), function (err) {
  			if (err) throw err;
		});
		return (user);
	} else { 
		return ("0");
	}
}

function createNewUser() {
 	var fs = require('fs');

	fs.appendFile('./server.js', ("name: '"+ name +"', user: '" + user + "', options: '" + options + "'; "), function (err) {
  		if (err) throw err;
	});

	return (user + " foi cadastrado(a) no sistema!");
}

function readServer() {
	fs = require('fs');
	fs.readFile('./server.js', 'utf8', function (err,data) {
  	if (err) {
    	users = err;
  	}
  	users = data;
	});
}