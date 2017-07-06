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