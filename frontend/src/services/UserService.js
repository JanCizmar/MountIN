"use strict";

import HttpService from "./HttpService";

export default class UserService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/auth";
    }

    static register(user) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, user, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        //console.log(JSON.parse(window.atob(base64)).id)
        return {
            id: JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username
        };
    }

    static getUserDetails(user_id) {
        return new Promise((resolve, reject) => {
            console.log(user_id);

            return HttpService.get(`${UserService.baseURL()}/profile/` + user_id, resolve, reject)
        });
    }


    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }
}