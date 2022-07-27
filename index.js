const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname + "/public"));

http.listen(process.env.PORT || 6000,function(){
    console.log('listening on port 3000')
});

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html'); 
});

// socket

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log('Connected');

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
})