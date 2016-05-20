
var express = require('express');


var app = express();
var server = app.listen(9001);

var io = require('socket.io').listen(server)


//app.listen();

//app.use(require('express').static(__dirname + '/'));
app.get('/client', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/vendor', function (req, res) {
  res.sendFile(__dirname + '/vendor.html');
});

io.on('connection', function (socket) {
    //console.log("connected" + socket.id);
    
  socket.emit('connected', { hello: 'world' });
  
  socket.on('userType', function (data) {
      console.log(data.type);
      socket.join(data.type);
   // console.log(users);
  });
  
  socket.on('newEvent',function(data){
      io.sockets.in('vendor').emit('message', socket.id);
  });
  
  socket.on('expressIntrest',function(data){
      io.sockets.in(data.user).emit('gotOne', "We are there for you");
  });
  
});
