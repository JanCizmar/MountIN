"use strict";

import HttpService from "./HttpService";

export default class ImageUploadService {

    constructor() {
    }

    static uploadedImagesBaseUrl = HttpService.apiURL() + "/uploaded/images/";

    static baseURL = HttpService.apiURL() + "/upload";


    static uploadImage(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', file);
            HttpService.postWithFile(`${ImageUploadService.baseURL}` + '/image', formData,
                function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static getImageURL(filename) {
        return ImageUploadService.uploadedImagesBaseUrl + "/" + filename;
    }
}