"use strict";

const TourModel = require('../models/tour');


const create = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });

    TourModel.create(req.body)
        .then(tour => res.status(201).json(tour))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const read   = (req, res) => {
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

    TourModel.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true}).exec()
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

const list  = (req, res) => {
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

    if(req.query.difficulties !== undefined){
        query.difficulty = req.query.difficulties;
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
        query.type = req.query.guideTypes;
    }
    if (req.query.guideTypes !== undefined) {
        if(req.query.guideTypes === 1){
            query.professional = true;
        }
        if(req.query.guideTypes === 0){
            query.professional = false;
        }
    }

    //"lat=11.4505487&lng=48.256156&activityTypes=1,2&difficulties=2,5&guideTypes=0,1&priceMin=100&priceMax=200&dateBefore=...&dateAfter=..."


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



module.exports = {
    create,
    read,
    update,
    remove,
    list,
    search
};