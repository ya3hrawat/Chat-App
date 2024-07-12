const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    io.emit('online', () => {
        
    });

    socket.on('room-joining', (name) => {
        io.emit('room-joining', name);
    })

    socket.on('user-typing', (name, item) => {
        io.emit('user-typing', name, item);
    })
    
    socket.on('chat-message', (msg, name) => {
        io.emit('chat-message', msg, name);
    });

    socket.on('disconnect', () => {
    });
});


server.listen(3000, () => {
    console.log(`listening on Port: 3000`);
});