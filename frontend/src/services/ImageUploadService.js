"use strict";

import HttpService from "./HttpService";
import UserService from "./UserService";

export default class ImageUploadService {

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/filesave";
    }

    static uploadImage(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('sampleFile', file);
            HttpService.postWithFile(`${ImageUploadService.baseURL()}/upload`,formData,
                function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}