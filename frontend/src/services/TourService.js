"use strict";

import HttpService from "./HttpService";

export default class TourService {

    constructor() {
    }

    timer = 0;

    static baseURL() {
        return "http://localhost:3000/tours";
    }

    static createTour(tour) {

        let inputs = {
            "date": tour.date,
            "description": tour.description,
            "difficulty": parseInt(tour.difficulty),
            "type": parseInt(tour.activityType),
            "name": tour.name,
            "cost": tour.cost,
            "route": tour.route,
            "image": tour.image
        };
        console.log(inputs);
        return new Promise((resolve, reject) => {
            HttpService.post(`${this.baseURL()}/`, inputs, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });


    }

    static getTours(filters, skip = 0, timeout = 1000) {
        clearTimeout(this.timer);
        return new Promise((resolve, reject) => {
            this.timer = setTimeout(() => {
                let query = JSON.parse(JSON.stringify(filters)); //clone the filters object
                query.lat = query.location.latLng.lat ? query.location.latLng.lat.toString() : undefined; //add just latLng, because don't need name
                query.lng = query.location.latLng.lng ? query.location.latLng.lng.toString() : undefined; //add just latLng, because don't need name
                //query.distance = "50";
                query.skip = skip.toString();

                delete query.location;
                let queryString = HttpService.buildQueryString(query);
                return HttpService.get(`${TourService.baseURL()}/search` + queryString, resolve, reject)
            }, timeout);
        });
    }

    static getTourDetails(tour_id) {
        return new Promise((resolve, reject) => {
            return HttpService.get(`${TourService.baseURL()}/` + tour_id, resolve, reject)
        });
    }

    static joinTourToggle(tour_id, state) {
        return new Promise((resolve, reject) => {
            return HttpService.put(`${TourService.baseURL()}/join/` + tour_id, {joined: state}, resolve, reject)
        });
    }

}
