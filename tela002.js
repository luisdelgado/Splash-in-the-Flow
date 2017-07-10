var user;
var resposta;
var options = "";

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    user = data.user;
}

function chat() {

	var title = document.getElementById("title").value;
	var topic = document.getElementById("option").options[document.getElementById("option").selectedIndex].text;
	var userToSend = user.slice(0, user.indexOf("'"));
	var exist;

	option = "Java";
    exist = user.indexOf(option) !== -1;
    if (exist) {
    	options = options + option + ", ";
    }
    option = "Python";
    exist = user.indexOf(option) !== -1;
    if (exist) {
    	options = options + option + ", ";
    }
    option = "CSS3";
    exist = user.indexOf(option) !== -1;
    if (exist) {
    	options = options + option + ", ";
    }
    option = "Node.js";
    exist = user.indexOf(option) !== -1;
    if (exist) {
    	options = options + option + ", ";
    }
    option = "Android";
    exist = user.indexOf(option) !== -1;
    if (exist) {
    	options = options + option + ", ";
    }
    option = "Swift";
    exist = user.indexOf(option) !== -1;
    if (exist) {
    	options = options + option + ", ";
    }
	
	var connection = new WebSocket('ws://localhost:9000/newDiscussion');

	connection.onopen = function(){

		console.log('Connection open!');

		if (topic.indexOf("Node.js") != -1) {
			topic = "node";
		}

		console.log(userToSend);

		var toSend = ("'" + title + "', topic: '" + topic + "' user: '" + userToSend + "';");
		connection.send(toSend);

		connection.onclose = function(){
			console.log('Connection closed');
		}

		connection.onmessage = function(e){
			var server_message = e.data;
			if (server_message != "erro") {
				var url = "./tela003.html?title=" + toSend + server_message + "-" + options + '[';
				document.location.href = url;
			} else {
				alert("O servidor está sobrecarregado! Tente novamente mais tarde.");
				var url = "./index.html";
				document.location.href = url;
			}
		}

	}
}