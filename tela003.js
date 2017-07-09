var title;
var titleF;
var topic;
var user;
var idC;
var idN;

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    title = data.title;
    console.log(title);
    
    //Pegando título
	var string = title;
  	var preString = "7";
  	var searchString = "%";
  	var preIndex = string.indexOf(preString);
  	var searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
	titleF = title.substring((preIndex+1), (searchIndex));

    document.getElementById("titulo").innerHTML = "Título: " + titleF;

    //Pegando tópico
	string = title;
  	preString = "topic:";
  	searchString = "%";
  	preIndex = string.indexOf(preString);
  	var finalIndex = string.indexOf("-");
  	var string2 = string.substring(preIndex+12, finalIndex);
  	searchIndex = string2.indexOf(searchString);
	topic = string2.slice(0, searchIndex);

	document.getElementById("topico").innerHTML = "Tópico: " + topic;

	//Pegando usuário
	string = title;
  	preString = "user";
  	searchString = "%";
  	preIndex = string.indexOf(preString);
  	var finalIndex = string.indexOf("-");
  	var string2 = string.substring(preIndex+11, finalIndex);
  	searchIndex = string2.indexOf(searchString);
	user = string2.slice(0, searchIndex);

	document.getElementById("name-text").value = user;
}

var connection = new WebSocket('ws://localhost:8081/testing');

    connection.onopen = function() {

        console.log('Connection open!');

    }

    connection.onclose = function() {

        console.log('Connection closed');

    }

    connection.onmessage = function(e) {

        var server_message = e.data;

        //Verificando ids
        string = server_message,
        preString = "id";
        searchString = "-",
        preIndex = string.indexOf(preString);
        searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
        idN = server_message.slice((preIndex+2), (searchIndex));
        server_message = server_message.substring(0, preIndex-1);

       if (idN == idC) {
            document.getElementById("result").innerHTML += server_message + "<br>";
       }
        
    }
    
    function send(){
        var name = document.getElementById("name-text").value;
        var msg = document.getElementById("msg-text").value;

        //Pegando id da conversa
        string = title,
        preString = ";";
        searchString = "-",
        preIndex = string.indexOf(preString);
        searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
        idC = title.slice((preIndex+1), (searchIndex));
        
        connection.send('['+name+'] ' + msg + " id" + idC + "-");
        document.getElementById("msg-text").value = '';
        
        //document.getElementById("result").innerHTML += msg + "<br>";
    }

var source = new EventSource("http://localhost:9091");

    source.onmessage = function(event) {

        document.getElementById("discussion").innerHTML = event.data;

    };