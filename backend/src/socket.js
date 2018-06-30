"use strict";

const socket = require('socket.io');
const MessageBoardController = require('./controllers/messageBoardController');

// Websocket handler
const handleSocketConnection = (server) => {
    // Start listening
    let io = socket(server);
    console.log('Websocket is listening');

    io.on('connection', function (socket) {
        console.log('a user connected');

        io.clients((error, clients) => {
            if (error) throw error;
            console.log(clients);
        });

        socket.on('joinRoom', function (tourId) {
            io.clients((error, clients) => {
                if (error) throw error;
                console.log(clients);
            });
            console.log('Join room: ', tourId);
            socket.join(tourId);
        });

        socket.on('sendMessage', function (received) {
            io.clients((error, clients) => {
                if (error) throw error;
                console.log(clients);
            });
            console.log('Server received message');
            console.log(received);
            // Save the message
            MessageBoardController.createMessage(received)
                .then(() => {
                    // Broadcast message
                    console.log('Broadcasting the message after create', received);
                    socket.broadcast.emit('receiveMessage', received);
                })
                .catch(err => {
                    console.log('Error saving message', err.message);
                });
        });

        socket.on('disconnect', function () {
            io.clients((error, clients) => {
                if (error) throw error;
                console.log(clients);
            });
            console.log('user disconnected');
        });
    });
};

module.exports = {handleSocketConnection};