"use strict";

export default class HttpService {
    constructor() {
    }

    static apiURL() {return "http://localhost:3000"; }

    static get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(url, {
            method: 'GET',
            headers: header
        }).then((resp) => {
            if(resp.ok) {
                return resp.json();
            }
            else if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
            }
            else {
                resp.json().then((json) => {
                    onError(json.error);
                });
            }
        }).then((resp) => {
            if(resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
            }
            onSuccess(resp);
        }).catch((e) => {
            onError(e.message);
        });
    }

    static put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(resp.ok) {
                return resp.json();
            }
            else if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
            }
            else {
                resp.json().then((json) => {
                    onError(json.error);
                });
            }
        }).then((resp) => {
            if(resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
            }
            onSuccess(resp);
        }).catch((e) => {
            onError(e.message);
        });
    }

    static post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if(resp.ok) {
                return resp.json();
            }
            else if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
            }
            else {
                resp.json().then((json) => {
                    onError(json.error);
                });
            }
        }).then((resp) => {
            if(resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
            }
            onSuccess(resp);
        }).catch((e) => {
            onError(e.message);
        });
    }

    static remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if(token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(url, {
            method: 'DELETE',
            headers: header
        }).then((resp) => {
            if(resp.ok) {
                return resp.json();
            }
            else if(this.checkIfUnauthorized(resp)) {
                window.location = "/#login";
            }
            else {
                resp.json().then((json) => {
                    onError(json.error);
                });
            }
        }).then((resp) => {
            onSuccess(resp);
        }).catch((e) => {
            onError(e.message);
        });
    }

    static checkIfUnauthorized(res) {
        return res.status === 401;
    }

    static buildQueryString(data) {
        let queryParams = [];
        for (let name of Object.keys(data)) {
            if (!data[name]) {
                delete data[name]; //delete undefined
                continue;
            }
            if (data[name] instanceof Array && data[name].length > 0) {
                queryParams.push(name + '=' + data[name].join(','));
                continue;
            } else if (data[name].length === 0) {
                continue;
            }

            if (typeof data[name] === 'string') {
                queryParams.push(name + '=' + data[name]);
                continue;
            }

            console.error('Key' + name + ' can not be added. Query can be built just from strings and arrays');
        }
        let queryString = queryParams.join('&');
        if (queryString !== '') {
            return '?' + queryString;
        }
        return '';
    }

}