var app = require('express')();
var server = require('http').Server(app);
// Socket io for push notifications
var io = require('socket.io')(server);

io.sockets.on('connection', function (socket) {
  socket.emit("hi");
  console.log("Connection made.");

  // listen to shots fired event received from the frontend.
  // broadcast to all clients that shots were fired
  socket.on('fired_server_fe', function (data) {
    console.log('Shots fired received at server.');
    socket.broadcast.emit('fired_client');
  });
});

app.get(/^(.+)$/, function(req, res) {
  res.sendfile('public/' + req.params[0]);
});

app.get('/', function(request, response) {
  response.sendfile('public/index.html');
});

server.listen(5000, function(){
  console.log('listening on :5000');
});
