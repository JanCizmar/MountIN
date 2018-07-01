"use strict";

import HttpService from "./HttpService";
import LocationService from "./LocationService";


export default class RentalAgencyService {

    timer = 0;

    constructor() {
    }

    static baseURL() {
        return "http://localhost:3000/rentalAgency";
    }

    static getRentalAgencies() {
            return new Promise((resolve, reject) => {
            LocationService.getLocation().then(function (location) {
                let lat= location.location.lat;
                let lng= location.location.lng;
                let query = '?lat='+lat+'&lng='+lng;
                    return HttpService.get(RentalAgencyService.baseURL() + query, resolve, reject)

                }
            )


        });
    }
}