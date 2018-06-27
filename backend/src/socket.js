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
            console.log('Join room: ', tourId);
            socket.join(tourId);
        });

        socket.on('sendMessage', function (message) {
            console.log('Server received message');
            console.log(message);
            // Save the message
            //MessageBoardController.createMessage(payload)
            //.then(message => {
            // Broadcast message
            console.log('Broadcasting the message after create');
            socket.broadcast.to(message.tourId).emit('receiveMessage', message);
            //})
            //.catch(err => {
            //  console.log('Error saving message', err.message);
            //});
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
};

module.exports = {handleSocketConnection};