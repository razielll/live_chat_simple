const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app); // io requires raw http
const io = socketio(server); // Setup Socket.io's server

// When we run the server our public file will also be ran
const publicDirectoryPath = path.join(__dirname, './public');
app.use(express.static(publicDirectoryPath));

io.on('connection', socket => {
    socket.broadcast.emit("showMessage", { name: 'Anonymous', message: 'A NEW USER HAS JOINED' })

    socket.on('sendMessage', message => io.emit('showMessage', message))
})
const port = process.env.PORT || 3000;
server.listen(port, () => console.log('Server is running...'));