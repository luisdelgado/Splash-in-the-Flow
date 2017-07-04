var user;
var Java;
var Python;
var CSS3;
var node;
var Android;
var Swift;

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
				var createAText = document.createTextNode(server_message);
				var newlink = document.createElement("a");
				newlink.setAttribute('href', './index.html');
				newlink.appendChild(createAText);
				var div = document.getElementById('here');
				div.appendChild(newlink);
				document.getElementById('here').appendChild(document.createElement("br"));

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