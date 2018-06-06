"use strict";

import data from "../sampleData/tours";

export default class TourService {

    constructor() {
    }

    //static baseURL() {return "http://localhost:3000/auth"; }

    static getTours() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 1000);
        });
    }
}