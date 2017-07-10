var title;
var titleF;
var topic;
var user;
var idC;
var idN;
var users;
var options;

window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }
    title = data.title;
    options = title.substring(title.indexOf("-")+1, title.indexOf("["));
    
    //Pegando título
	var string = title;
  	var preString = "7";
  	var searchString = "%27";
  	var preIndex = string.indexOf(preString);
  	var searchIndex = preIndex + string.substring(preIndex).indexOf(searchString);
	titleF = title.substring((preIndex+1), (searchIndex));

	var exist;

	while (exist = titleF.indexOf("%20") !== -1) {
		var preWord;
		var endWord;

		preWord = titleF.substring(0, titleF.indexOf("%20"));
		endWord = titleF.substring(titleF.indexOf("%20")+3, titleF.length);
		titleF = preWord + " " + endWord;
	}

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

    	alert("Ocorreu um erro de connexão. Por favor, se conecte novamente.");
        console.log('Connection closed');
        var url = "./index.html";
		document.location.href = url;

    }

    connection.onmessage = function(e) {

        var server_message = e.data;
        console.log(server_message);

        if (server_message.length < 2 || server_message == "erro") {
        	alert("Ocorreu um erro de connexão. Por favor, se conecte novamente.");
        	var url = "./index.html";
			document.location.href = url;
        }

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
        console.log(idC);
        
        connection.send('['+name+'] ' + msg + " id" + idC + "-");
        document.getElementById("msg-text").value = '';
        
        //document.getElementById("result").innerHTML += msg + "<br>";
    }

var source = new EventSource("http://localhost:9091");

    source.onmessage = function(event) {

    	var answer = event.data;
    	console.log(answer);
        document.getElementById("discussion").innerHTML = "";
        if (answer != undefined) {
        	filterUserOptions (answer);
        }

    };

    function filterUserOptions (answer) {
        var atualMessage;
        var fim;
        var NovoFim;

        var exist = title.indexOf("Java") !== -1;
        fim = answer.indexOf(";");
        atualMessage = answer.substring(0, fim);

        if (exist) {
        	var length = verificarDiscussoes(atualMessage);
			if (length > 1) {
				//Tratando resposta
				tratandoResposta(atualMessage, "Java");
			}
        }

        exist = title.indexOf("Python") !== -1;
        answer = answer.substring(fim+1, answer.length);
        fim = answer.indexOf(";");
        atualMessage = answer.substring(0, fim);

        if (exist) {
            var length = verificarDiscussoes(atualMessage);
			if (length > 1) {
				//Tratando resposta
				tratandoResposta(atualMessage, "Python");
			}
        }

        exist = title.indexOf("CSS3") !== -1;
        answer = answer.substring(fim+1, answer.length);
        fim = answer.indexOf(";");
        atualMessage = answer.substring(0, fim);

        if (exist) {
            var length = verificarDiscussoes(atualMessage);
			if (length > 1) {
				//Tratando resposta
				tratandoResposta(atualMessage, "CSS3");
			}
        }

        exist = title.indexOf("Node.js") !== -1;
        answer = answer.substring(fim+1, answer.length);
        fim = answer.indexOf(";");
        atualMessage = answer.substring(0, fim);

        if (exist) {
            var length = verificarDiscussoes(atualMessage);
			if (length > 1) {
				//Tratando resposta
				tratandoResposta(atualMessage, "Node.js");
			}
        }

        exist = title.indexOf("Android") !== -1;
        answer = answer.substring(fim+1, answer.length);
        fim = answer.indexOf(";");
        atualMessage = answer.substring(0, fim);

        if (exist) {
            var length = verificarDiscussoes(atualMessage);
			if (length > 1) {
				//Tratando resposta
				tratandoResposta(atualMessage, "Android");
			}
        }

        exist = title.indexOf("Swift") !== -1;
        answer = answer.substring(fim+1, answer.length);
        fim = answer.indexOf(";");
        atualMessage = answer.substring(0, fim);

        if (exist) {
            var length = verificarDiscussoes(atualMessage);
			if (length > 1) {
				//Tratando resposta
				tratandoResposta(atualMessage, "Swift");
			}
        }

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

    function tratandoResposta (server_message, topic) {
    
        server_message = server_message+";";
        var atualString = server_message;

        //Pegando tópico
        var topic = topic;

        //Pegando user
        userToSend = user;

        var numberFim = atualString.substring(atualString.length - 2, atualString.length - 1);
        var toSend = "";
        var fim = "  ';";

        while (atualString != fim) {
            //Pegando título
            var string = atualString;
            var preString = "title: '";
            var searchString = "'";
            var preIndex = string.indexOf(preString);
            var finalIndex = atualString.indexOf(";");
            var string2 = string.substring(preIndex+8, finalIndex);
            var searchIndex = string2.indexOf(searchString);
            var title = string2.slice(0, searchIndex);

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
            newlink.setAttribute('href', './tela003.html?title=' + toSend + id + '-' + options + '[');
            newlink.appendChild(createAText);
            var div = document.getElementById('discussion');
            div.appendChild(newlink);
            document.getElementById('discussion').appendChild(document.createElement("br"));

            preIndex = atualString.indexOf(",");
            finalIndex = atualString.indexOf(";");
            atualString = atualString.substring(preIndex+1, finalIndex+1);
        }
        return ("oi");
    }