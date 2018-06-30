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
            "coordinates": req.body.route.map(point => [point[1], point[0]])
        };
    }

    console.log(req.userId);
    req.body.creator = req.userId;
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
    TourModel.findById(req.params.id).populate('creator participants').exec()
        .then(tour => {
            //otherwise it is immutable or what
            tour = JSON.parse(JSON.stringify(tour));
            tour.route = tour.route.coordinates.map(point => [point[1], point[0]]);

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

    if (req.body.route !== undefined && req.body.route.length > 1) {
        req.body.route = {
            "type": "MultiPoint",
            "coordinates": req.body.route.map(point => [point[1], point[0]])
        };
    }

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
        .then(tours => {

            return res.status(200).json(tours)
        })
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


    if (req.query.lat !== undefined && req.query.lng !== undefined) {
        query.route = {
            $nearSphere: {
                $geometry: {
                    type: 'Point',
                    coordinates: [req.query.lng, req.query.lat]
                },
            }
        };
        if (req.query.distance !== undefined) {
            query.route.$nearSphere.$maxDistance = req.query.distance * 1000;
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

    //console.log(query.route.$nearSphere);

    TourModel.find(query).skip(parseInt(req.query.skip)).limit(28).exec()
        .then(tours => res.status(200).json(tours.map(tour => {
            //we dont need the type of GEO object, so the tour is just coordinates
            if (tour.route && tour.route.coordinates) {
                //it is not gonna change the route without this line
                tour = JSON.parse(JSON.stringify(tour));
                //swaping the order of coordinates because of mongoDB
                tour.route = tour.route.coordinates.map(point => [point[1], point[0]]);
            }
            return tour;
        })))
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


const join = async (req, res) => {
    //need value from body
    if (req.body.joined === undefined) {
        res.status(400).json({
            error: 'Bad request',
            message: "No state provided"
        });
        return;
    }
    try {
        //getting tour from db
        let tour = await TourModel.findById(req.params.id).exec();
        //handle if there is no tour we want
        if (tour === null) {
            res.status(400).json({
                error: 'Bad request',
                message: "Tour not found"
            });
            return;
        }
        //convert participant array of object to array of strings
        let participants = tour.participants.map(id => id.toString());
        //find user in db
        let user = await UserModel.findById(req.userId).exec();
        //handle if there is no user like that
        if (user === null) {
            res.status(400).json({
                error: 'Bad request',
                message: "User not found"
            });
            return;
        }
        //convert tours to array of strings
        let tours = user.toursAttending.map(id => id.toString());

        if (req.body.joined) {
            //if there already is the participant, we should not add him again
            if (!participants.includes(req.userId)) {
                participants.push(req.userId);
            }
            //same thing with tours array in user object
            if (!tours.includes(req.params.id)) {
                tours.push(req.params.id);
            }
        } else {
            //removing user and tour or both objects
            if (participants.includes(req.userId)) {
                let idx = participants.indexOf(req.userId);
                participants.splice(idx, 1);
            }
            if (tours.includes(req.params.id)) {
                let idx = tours.indexOf(req.params.id);
                tours.splice(idx, 1);
            }
        }
        //seting the arrays to parent objects
        tour.participants = participants;
        user.toursAttending = tours;

        //saving both to db
        tour.save((err) => {
            if (err)
                res.status(500).json({
                    error: 'Internal server error',
                    message: err
                });
            else {
                user.save(async (err) => {
                    if (err)
                        res.status(500).json({
                            error: 'Internal server error',
                            message: err
                        });
                    else {
                        let tour = await TourModel.findById(req.params.id).populate('participants').exec();
                        res.status(200).json(tour);
                    }
                });
            }
        });
    } catch (err) {
        res.status(500).json({
            error: 'Internal server error',
            message: err
        });
    }
};

module.exports = {
    create,
    read,
    update,
    remove,
    list,
    search,
    getParticipants,
    join
};