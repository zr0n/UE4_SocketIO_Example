/** Server */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const ue4Clients = []
 
io.on('connection', (socket) => {
	console.log('a user connected');
  
  
	socket.on('ue4_user_connected', (data) => {
		ue4Clients.push(socket)
		console.log("A UE4 user just connected")
	})

	socket.on('browser_user_connected', () => {
		console.log("A user connected by the browser")
	})
	
	socket.on('button_click', () => {
		console.log("A html button was clicked, sending signal to all UE4 clients:")
		ue4Clients.forEach((client, i) => {
			console.log("Emitting Button click to socket " + i)
			client.emit("button_click")
		})
	})

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});