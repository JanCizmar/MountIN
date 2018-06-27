"use strict";

import HttpService from "./HttpService";

export default class MessageService {

    constructor() {
    }

    timer = 0;

    static baseURL() {
        return "http://localhost:3000/messageBoard/";
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