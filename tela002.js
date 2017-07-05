var user;

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
	
	var connection = new WebSocket('ws://localhost:9000/newDiscussion');

	connection.onopen = function(){

		console.log('Connection open!');

		if (topic.indexOf("Node.js") != -1) {
			topic = node;
		}

		var toSend = ("'" + title + "', topic: '" + topic + "' user: '" + userToSend + "';");
		connection.send(toSend);

		connection.onclose = function(){
			console.log('Connection closed');
		}

		connection.onmessage = function(e){
			var server_message = e.data;
			if (server_message != "erro") {
				var url = "./tela003.html?title=" + toSend + id + "-";
				document.location.href = url;
			} else {
				alert("O servidor está sobrecarregado! Tente novamente mais tarde.");
				var url = "./index.html";
				document.location.href = url;
			}
		}

	}
}