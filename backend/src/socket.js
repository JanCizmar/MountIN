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

        io.on('createMessage', function(payload){
            // Save the message
            MessageBoardController.createMessage(payload)
                .then(message => {
                    // Broadcast message
                    socket.broadcast.emit('addMessage', message);
                })
                .catch(err => {
                    console.log('Error saving message', err.message);
                });
        });

        io.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
};

module.exports = {handleSocketConnection};