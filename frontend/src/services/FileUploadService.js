"use strict";

import HttpService from "./HttpService";

export default class FileUploadService {

    static uploadedFilesBaseUrl = HttpService.apiURL() + "/uploaded/files/";
    static baseURL = HttpService.apiURL() + "/upload";

    constructor() {
    }

    static uploadFile(file) {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', file);
            HttpService.postWithFile(`${FileUploadService.baseURL}` + '/file', formData,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    static getFileURL(filename) {
        return FileUploadService.uploadedFilesBaseUrl + "/" + filename;
    }
}