var WebSocketServer = require('ws').Server;
var allOptions;
var title;
var topic;
var id;
var user;
var newData;
readServer();

wss = new WebSocketServer({port: 9000, path: '/newDiscussion'});

wss.on('connection', function(ws) {

	ws.on('message', function(message) {

		console.log('Msg received in server: %s ', message);

		//Pegando título
		var string = message,
  		preString = "'"
  		searchString = "'",
  		preIndex = string.indexOf(preString)+1,
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
		title = message.slice((preIndex), (searchIndex));
		console.log(title);

		//Pegando tópico
		var string = message,
  		preString = "topic: '"
  		searchString = "'",
  		preIndex = string.indexOf(preString),
  		searchIndex = preIndex + 7 + string.substring(preIndex).indexOf(searchString);
		topic = message.slice((preIndex+8), (searchIndex-2));
		console.log(topic);

		//Pegando usuário
		var string = message,
  		preString = "user: '"
  		searchString = "%",
  		preIndex = string.indexOf(preString),
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
		user = message.slice((preIndex+7), (searchIndex));
		console.log(user);

		//Pegando o último id
		var string = allOptions,
  		preString = "contador = "
  		searchString = ";",
  		preIndex = string.indexOf(preString),
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
		id = Number(allOptions.slice((preIndex+11), (searchIndex)))+1;
		console.log(id);

		//Atualizando último id
		newData = allOptions.slice(0, preIndex+11) + id +";";
		console.log(newData);
		updateData(newData);

		ws.send("Chegou!");

	});

	console.log('new connection');

});

function readServer() {
	fs = require('fs');
	fs.readFile('./serverDiscussion.js', 'utf8', function (err,data) {
  	if (err) {
    	allOptions = err;
  	}
  	allOptions = data;
	});
}

function updateData(newData) {
	//Apagando tudo
	var fs = require('fs')
	fs.writeFile('./serverDiscussion.js', '', function(){console.log('done')});

	//Escrevendo atualizado
	fs.appendFile('./serverDiscussion.js', newData, function (err) {
  		if (err) throw err;
	});

	//Atualizando leitura
	readServer();
}