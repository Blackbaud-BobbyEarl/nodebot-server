var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)
console.log('http server listening on %d', port);

var wss = new WebSocketServer({server: server});
console.log('websocket server created');

wss.on('connection', function(ws) {
    console.log('websocket connection opened');

    ws.on('message', function (data) {
        console.log('received: ' + data);
        wss.broadcast(data);
    });

    ws.on('close', function() {
        console.log('websocket connection closed');
    });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};
