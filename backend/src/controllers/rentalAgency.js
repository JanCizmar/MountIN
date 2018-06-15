"use strict";

const RentalAgencyModel = require('../models/rentalAgency');
const defaultDistanceKilometer = 20;


const findNearbyAgencies = (req, res) => {
    let distance;

    if (req.body.lat === undefined || req.body.lng === undefined)
        return res.status(400).json({
            error: 'Bad request',
            message: 'Latitude or longitude not specified'
        });

    if (req.body.distance === undefined)
        distance = defaultDistanceKilometer;
    else
        distance = req.body.distance;

    RentalAgencyModel.find().where('location').near({
        center: [req.body.lat, req.body.lng],
        maxDistance: distance,
        spherical: true
        }
    ).exec()
        .then(agencies => res.status(200).json(agencies))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

module.exports = findNearbyAgencies;