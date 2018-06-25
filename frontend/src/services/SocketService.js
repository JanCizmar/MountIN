const io = require('socket.io-client');

export default class SocketService {
    constructor() {
    }

    static getSocket() {
        return io.connect('http://localhost:3000')
    }

    static listenForMessage(socket, handler) {
        socket.on('receiveMessage', handler);
    }

    static sendMessage(socket, message) {
        socket.emit('sendMessage', message);
    }

    static disconnect(socket) {
        socket.disconnect();
    }
}