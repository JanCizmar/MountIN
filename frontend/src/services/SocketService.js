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

    static joinTourRoom(socket, tourId) {
        socket.on('connect', () => {
            console.log('Joining now', tourId);
            socket.emit('joinRoom', tourId);
        })
    }

    static sendMessage(socket, message) {
        socket.emit('sendMessage', message);
    }

    static disconnect(socket) {
        socket.disconnect();
    }
}