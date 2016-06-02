// TODO: soon: move to a different file, like "faye_client.js"?


    // PubSub client erstellen
    var client = new Faye.Client('/faye');
    // Topic '/fahrten' subscriben
    var subscription = client.subscribe('/messages', function(message) {
        //TODO: process "message"
        showmessage(message);
    });


function showmessage(message){
	document.getElementById("message").innerHTML = message;
};