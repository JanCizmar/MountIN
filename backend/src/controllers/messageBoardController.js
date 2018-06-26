"use strict";

const MessageModel = require('../models/message');


const getTourMessageHistory = (req, res) => {
    let tourId = req.params.tourId;

    MessageModel.find().where('tourId').equals(tourId).sort({createdAt: 'desc'}
    ).exec()
        .then(messages => res.status(200).json(messages))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));
};

const createMessage = (payload) => {
    return MessageModel.create(payload);
};

module.exports = {
    getTourMessageHistory,
    createMessage
};