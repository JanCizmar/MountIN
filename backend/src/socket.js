"use strict";

const socket = require('socket.io');
const MessageBoardController = require('./controllers/messageBoardController');

// Websocket handler
const handleSocketConnection = (server) => {
    // Start listening
    let io = socket(server);
    console.log('Websocket is listening');

    io.on('connection', function(socket){
        console.log('a user connected');
        io.clients((error, clients) => {
            if (error) throw error;
            console.log(clients);
        });

        socket.on('sendMessage', function(payload){
            console.log('Server received message');
            console.log(payload);
            // Save the message
            MessageBoardController.createMessage(payload)
                .then(message => {
                    // Broadcast message
                    console.log('Broadcasting the message after create');
                    socket.broadcast.emit('receiveMessage', message);
                })
                .catch(err => {
                    console.log('Error saving message', err.message);
                });
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};

module.exports = {handleSocketConnection};