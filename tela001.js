var user;
var Java;
var Python;
var CSS3;
var node;
var Android;
var Swift;
var toSend;

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    user = data.user;

    //Verificando qual as opções do usuário

    var option = "Java";
    verificationOptions(option);
    option = "Python";
    verificationOptions(option);
    option = "CSS3";
    verificationOptions(option);
    option = "Node.js";
    verificationOptions(option);
    option = "Android";
    verificationOptions(option);
    option = "Swift";
    verificationOptions(option);

}

function verificationOptions(option) {
	var exist = user.indexOf(option) !== -1;
	
	if (exist) {
		var connection = new WebSocket('ws://localhost:9090/options');
		connection.onopen = function(){
			console.log('Connection open!');
			if (option.indexOf("Node.js") == -1) {
				connection.send("options: " + option);
			} else {
				connection.send("options: node");
			}
		}

		connection.onclose = function(){
		console.log('Connection closed');
		}

		connection.onmessage = function(e){
			var server_message = e.data;
			var length = verificarDiscussoes(server_message);

			if (length > 1) {

				//Tratando resposta
				var toSend = tratandoResposta(server_message);
			}
		}
	}
}

function createDiscussion() {
	var url = "./Tela002.html?user=" + user;
	document.location.href = url;
}

function verificarDiscussoes(server_message) {
	var resposta;

	var string = server_message,
  		preString = ("'"),
  		searchString = " '",
  		preIndex = string.indexOf(preString),
  		searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);

		var retorno = server_message.slice(preIndex, searchIndex);

		resposta = retorno.length;

	return resposta;
}

function tratandoResposta (server_message) {
	
	server_message = server_message+";";
	var atualString = server_message;

	//Pegando tópico
	var topic = atualString.slice(0, atualString.indexOf(" ="));

	//Pegando user
	userToSend = user.slice(0, user.indexOf("%"));

	var toSend = "";
	var fim = "  ';";

	while (atualString != fim) {
		//Pegando título
		var string = atualString;
  		var preString = "title: '";
  		var searchString = "'";
  		var preIndex = string.indexOf(preString);
  		var searchIndex = preIndex + 7 + string.substring(preIndex).indexOf(searchString);
		var title = atualString.slice(preIndex+8, searchIndex-1);

		//Pegando id
		string = atualString;
  		preString = "id: '";
  		searchString = "'";
  		preIndex = string.indexOf(preString);
  		searchIndex = preIndex + 4 + string.substring(preIndex).indexOf(searchString);
		var id = atualString.slice(preIndex+5, searchIndex-2);

		toSend = ("'" + title + "', topic: '" + topic + "' user: '" + userToSend + "';");

		var createAText = document.createTextNode(topic + " - " + title);
		var newlink = document.createElement("a");
		newlink.setAttribute('href', './tela003.html?title=' + toSend + id + '-');
		newlink.appendChild(createAText);
		var div = document.getElementById('here');
		div.appendChild(newlink);
		document.getElementById('here').appendChild(document.createElement("br"));

		preIndex = atualString.indexOf(",");
		finalIndex = atualString.indexOf(";");
		atualString = atualString.substring(preIndex+1, finalIndex+1);
	}
	return ("oi");
}