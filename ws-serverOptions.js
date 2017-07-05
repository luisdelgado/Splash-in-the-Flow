var WebSocketServer = require('ws').Server;
var allOptions;
var options;
var resposta;
readServer();

wss = new WebSocketServer({port: 9090, path: '/options'});

wss.on('connection', function(ws) {

	ws.on('message', function(message) {

		readServer();
		console.log('Msg received in server: %s ', message);

		options = message.substr(message.indexOf(": ")+2);
		resposta = verificationOptions();
		ws.send(resposta);

	});

	console.log('new connection');

});

function verificationOptions() {
	
		var string = allOptions,
  		preString = options
  		searchString = ";",
  		preIndex = string.indexOf(preString),
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);

		var retorno = allOptions.slice(preIndex, searchIndex);
		return (retorno);
	
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
}