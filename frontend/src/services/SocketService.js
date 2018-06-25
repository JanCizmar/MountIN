const io = require('socket.io-client');

export default function () {
    function getSocket() {
        return io.connect('http://localhost:3000')
    }

    function listenForMessage(socket, handler) {
        socket.on('receiveMessage', handler);
    }

    function sendMessage(socket, message) {
        socket.emit('sendMessage', message);
    }

    function disconnect(socket) {
        socket.disconnect();
    }

    return {
        getSocket,
        listenForMessage,
        sendMessage,
        disconnect
    }
}