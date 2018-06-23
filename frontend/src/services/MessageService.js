"use strict";

import HttpService from "./HttpService";
const io = require('socket.io-client');

export default class MessageService {

    constructor() {
    }

    timer = 0;

    static getSocket() {
        return io();
    }

    static sendMessage(socket, message) {
        socket.emit('createMessage', message);
    }

    static baseURL() {
        return "http://localhost:3000/messageBoard";
    }

    static getMessageHistory(tourId, timeout = 1000) {
        clearTimeout(this.timer);
        return new Promise((resolve, reject) => {
            this.timer = setTimeout(() => {
                return HttpService.get(MessageService.baseURL() + tourId, resolve, reject)
            }, timeout);
        });
    }
}