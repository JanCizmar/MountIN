"use strict";

const TourModel = require('../models/tour');
const UserModel = require('../models/user');


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

    UserModel.findById(req.body.creator).then(creator => {
        if (creator !== null) {
            TourModel.create(req.body)
                .then(tour => res.status(201).json(tour))
                .catch(error => res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                }));
        } else {
            res.status(400).json({
                error: 'Bad request',
                message: 'Creator does not exist'
            });
        }
    }).catch(error => res.status(500).json({
        error: 'Internal server error',
        message: error
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
    let query = {$and: []};

    if (req.query.difficulties !== undefined) {
        query.$and.push({
            $or: req.query.difficulties.split(',').map((diff) => {
                return {difficulty: diff}
            })
        });
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
        query.$and.push({
            $or: req.query.activityTypes.split(',').map((type) => {
                return {type}
            })
        });
    }

    if (req.query.guideTypes !== undefined) {
        let arrayGuideTypes = req.query.guideTypes.split(',');

        if (arrayGuideTypes.length === 1) {
            query.$and.push({
                    $or: [
                        {
                            'creator.professional': arrayGuideTypes[0] === '1'
                        }
                    ]
                }
            )
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

    if (req.query.price !== undefined && req.query.price.length > 2) {
        let arrayPrices = req.query.price.split(',');
        query.cost = {
            $gte: arrayPrices[0],
            $lte: arrayPrices[1]
        }
    }

    if (query.$and.length === 0) {
        delete query.$and;
    }

    TourModel.find(query).skip(parseInt(req.query.skip)).limit(28).exec()
        .then(tours => res.status(200).json(tours))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
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