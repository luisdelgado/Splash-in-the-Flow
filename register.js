function login () {

	var nickname = document.getElementById("nickname").value;
	
	var connection = new WebSocket('ws://localhost:8080/testing');

	connection.onopen = function(){

		console.log('Connection open!');

		connection.send("login: " + nickname);

	}

	connection.onclose = function(){

		console.log('Connection closed');

	}

	connection.onmessage = function(e){

		var server_message = e.data;

		console.log(server_message);

	}
}

function register() {

	var name = document.getElementById("name").value;
	var user = document.getElementById("user").value;
	var el = document.getElementsByTagName('select')[0];
  	var options = getSelectValues(el);
	
	var connection = new WebSocket('ws://localhost:8080/testing');

	connection.onopen = function(){

		console.log('Connection open!');

		connection.send("register: " + name + ", " + user + ", options: " + options);

	}

	connection.onclose = function(){

		console.log('Connection closed');

	}

	connection.onmessage = function(e){

		var server_message = e.data;

		console.log(server_message);

	}
}

function getSelectValues(select) {
  	var result = [];
  	var options = select && select.options;
  	var opt;

  	for (var i=0, iLen=options.length; i<iLen; i++) {
    	opt = options[i];

    	if (opt.selected) {
      		result.push(opt.value || opt.text);
    	}
  	}
  	return result;
}