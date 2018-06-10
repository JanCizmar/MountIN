"use strict";

import HttpService from "./HttpService";

export default class TourService {

    constructor() {
    }

    timer = 0;

    static baseURL() {
        return "http://localhost:3000/tours";
    }

    static getTours(filters, timeout = 1000) {
        clearTimeout(this.timer);
        return new Promise((resolve, reject) => {
            this.timer = setTimeout(() => {
                let query = JSON.parse(JSON.stringify(filters)); //clone the filters object
                query.latLng = query.location.latLng.lat ? [query.location.latLng.lat, query.location.latLng.lng] : undefined; //add just latLng, because don't need name
                delete query.location;


                let queryString = HttpService.buildQueryString(query);

                return HttpService.get(`${TourService.baseURL()}/search` + queryString, resolve, reject)
            }, timeout);
        });
    }
}