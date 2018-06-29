"use strict";
import Geocode from "react-geocode";


export default class LocationService {
    static getLocation() {
        return new Promise((resolve, reject) => {
            function getAddress(lat, lng) {
                Geocode.setApiKey("AIzaSyBiqph4VE1UPfoHwmBX7NYkFApXlngUVkI");
                Geocode.fromLatLng(lat, lng).then(
                    response => {
                        resolve({
                            address: response.results[0].formatted_address,
                            location: response.results[0].geometry.location
                        })
                    },
                    error => {
                        reject(error)
                    }
                );
            }

            function ipLookUp() {
                fetch('http://ip-api.com/json').then(response => response.json())
                    .then(
                        function success(response) {
                            getAddress(response.lat, response.lon);
                        },

                        function fail(data, status) {
                            console.error('Cant get GEOLocation', status);
                        }
                    );
            }

            if ("geolocation" in navigator) {
                console.log("calling");
                // check if geolocation is supported/enabled on current browser
                navigator.geolocation.getCurrentPosition(position => {
                        getAddress(position.coords.latitude, position.coords.longitude);
                    },
                    error_message => {
                        console.error('An error has occured while retrieving location', error_message);
                        ipLookUp()
                    }
                );
            } else {
                ipLookUp()
            }
        })
    }
}