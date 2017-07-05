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

		readServer();
		console.log('Msg received in server: %s ', message);

		//Pegando título
		var string = message;
  		var preString = "'";
  		var searchString = "'";
  		var preIndex = string.indexOf(preString)+1;
  		var searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
		title = message.slice((preIndex), (searchIndex));

		//Pegando tópico
		string = message;
  		preString = "topic: '";
  		searchString = "'";
  		preIndex = string.indexOf(preString);
  		searchIndex = preIndex + 7 + string.substring(preIndex).indexOf(searchString);
		topic = message.slice((preIndex+8), (searchIndex-2));

		//Pegando usuário
		string = message,
  		preString = "user: '";
  		searchString = "%",
  		preIndex = string.indexOf(preString);
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
		user = message.slice((preIndex+7), (searchIndex));

		//Pegando o último id
		string = allOptions;
  		preString = "contador = ";
  		searchString = ";";
  		preIndex = string.indexOf(preString);
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
		id = (Number(allOptions.slice((preIndex+11), (searchIndex))))+1;
		if (id==1) {
			ws.send("erro");
		} else {
			//Atualizando último id
			newData = allOptions.slice(0, preIndex+11) + id +";";
			allOptions = newData;

			//Salvando nova discussão no servidor
			//Pegando tópico
			string = allOptions;
  			preString = topic;
  			searchString = "'";
  			preIndex = string.indexOf(preString);
  			searchIndex2 = preIndex + string.substring(preIndex).indexOf(searchString);
			newData = allOptions.slice(0, searchIndex2+1) + "id: '" + id + "' title: '" + title + "', " + allOptions.slice(searchIndex2+1, searchIndex+1);
			updateData(newData);
			ws.send(id);
		}

	});

	console.log('new connection');

});

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

function updateData(newData) {
	//Apagando tudo
	var fs = require('fs')
	fs.writeFile('./serverDiscussion.js', '', function(){console.log('done')});

	//Escrevendo atualizado
	fs.appendFile('./serverDiscussion.js', newData, function (err) {
  		if (err) throw err;
	});
}