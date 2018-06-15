"use strict";

const TourModel = require('../models/tour');


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    //update the route to GeoJson format
    if (req.body.route !== undefined && req.body.route.length > 1) {
        req.body.route = {
            "type": "MultiPoint",
            "coordinates": req.body.route.slice()
        };
    }


    TourModel.create(req.body)
        .then(tour => res.status(201).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read = (req, res) => {
    TourModel.findById(req.params.id).exec()
        .then(tour => {

            if (!tour) return res.status(404).json({
                error: 'Not Found',
                message: `Tour not found`
            });

            res.status(200).json(tour)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    TourModel.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}).exec()
        .then(tour => res.status(200).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const remove = (req, res) => {
    TourModel.findByIdAndRemove(req.params.id).exec()
        .then(() => res.status(200).json({message: `Tour with id${req.params.id} was deleted`}))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const list = (req, res) => {
    TourModel.find({}).exec()
        .then(tours => res.status(200).json(tours))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const search = (req, res) => {

    //res.send(JSON.stringify(req.query));
    let query = {};

    if (req.query.difficulties !== undefined) {
        let arrayDifficulties = req.query.difficulties.split(',');
        //res.send(arrayDifficulties.length)
        if (arrayDifficulties.length === 2) {
            query.$or = [
                {difficulty: arrayDifficulties[0]},
                {difficulty: arrayDifficulties[1]}
            ]
        } else if (arrayDifficulties.length === 3) {
            query.$or = [
                {difficulty: arrayDifficulties[0]},
                {difficulty: arrayDifficulties[1]},
                {difficulty: arrayDifficulties[2]}
            ]
        } else if (arrayDifficulties.length === 4) {
            query.$or = [
                {difficulty: arrayDifficulties[0]},
                {difficulty: arrayDifficulties[1]},
                {difficulty: arrayDifficulties[2]},
                {difficulty: arrayDifficulties[3]}
            ]
        } else {
            query.difficulty = req.query.difficulties;
        }
    }
    if (req.query.dateAfter !== undefined) {
        query.date = {
            $gte: req.query.dateAfter,
        }
    }
    if (req.query.dateBefore !== undefined) {
        if (query.date === undefined) {
            query.date = {};
        }
        query.date.$lte = req.query.dateBefore;
    }
    if (req.query.activityTypes !== undefined) {
        let arrayActivityTypes = req.query.activityTypes.split(',');
        //res.send(arrayDifficulties.length)
        if (arrayActivityTypes.length === 2) {
            query.$or = [
                {type: arrayActivityTypes[0]},
                {type: arrayActivityTypes[1]}
            ]
        } else if (arrayActivityTypes.length === 3) {
            query.$or = [
                {type: arrayActivityTypes[0]},
                {type: arrayActivityTypes[1]},
                {type: arrayActivityTypes[2]}
            ]
        } else if (arrayActivityTypes.length === 4) {
            query.$or = [
                {type: arrayActivityTypes[0]},
                {type: arrayActivityTypes[1]},
                {type: arrayActivityTypes[2]},
                {type: arrayActivityTypes[3]}
            ]
        } else {
            query.type = req.query.activityTypes;
        }
    }
    if (req.query.guideTypes !== undefined) {
        let arrayGuideTypes = req.query.guideTypes.split(',');

        if (arrayGuideTypes.length === 1) {
            query.$or = [
                {
                    creator: {
                        professional: arrayGuideTypes[0] === 1
                    }
                }]
        }
    }

    if (req.query.distance !== undefined && req.query.lat !== undefined && req.query.lng !== undefined) {
        query.route = {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [req.query.lat, req.query.lng]
                },
                $maxDistance: req.query.distance * 1000
            }
        }
    }
    if (req.query.price !== undefined) {
        let arrayPrices = req.query.price.split(',');
        query.cost = {
            $gte: arrayPrices[0],
            $lte: arrayPrices[1]
        }
    }

    //MyCollection._ensureIndex({'data.address.located':'2dsphere'});

    //"lat=11.4505487&lng=48.256156&activityTypes=1,2&difficulties=2,5&guideTypes=0,1&priceMin=100&priceMax=200&dateBefore=...&dateAfter=..."
    // var METERS_PER_MILE = 1609.34
    // db.restaurants.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] }, $maxDistance: 5 * METERS_PER_MILE } } })


    //res.send(JSON.stringify(query));

    TourModel.find(query).exec()
        .then(tours => res.status(200).json(tours))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));

    // TourModel.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true}).exec()
    //     .then(tour => res.status(200).json(tour))
    //     .catch(error => res.status(500).json({
    //         error: 'Internal server error',
    //         message: error.message
    //     }));
};

const getParticipants = (req, res) => {
    TourModel.findById(req.params.id).populate('participants').select('participants').exec()
        .then(participants => {

            if (!participants) return res.status(404).json({
                error: 'Not Found',
                message: `Specified tour not found`
            });

            res.status(200).json(participants)
        })
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
    }));
};

module.exports = {
    create,
    read,
    update,
    remove,
    list,
    search,
    getParticipants
};