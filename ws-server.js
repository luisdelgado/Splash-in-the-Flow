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

		var string = users,
  		preString = user
  		searchString = ";",
  		preIndex = string.indexOf(preString),
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);

		var retorno = users.slice(preIndex, searchIndex);

		console.log(retorno);

		return (retorno);
	} else { 
		return ("0");
	}
}

function createNewUser() {
 	var fs = require('fs');

	fs.appendFile('./server.js', ("name: '"+ name +"', user: '" + user + "', options: '" + options + "'; "), function (err) {
  		if (err) throw err;
	});

	var retorno = (user + " foi cadastrado(a) no sistema!");

	console.log(retorno)

	return (retorno);
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