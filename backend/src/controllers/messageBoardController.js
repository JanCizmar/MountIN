"use strict";

const MessageModel = require('../models/message');


const getTourMessageHistory = (req, res) => {
    let tourId = req.params.tourId;
    console.log('TourId', tourId);

    MessageModel.find().where('tourId').equals(tourId).populate('userId').sort({createdAt: 'asc'}
    ).exec()
        .then(messages => {
            let response = [];
            messages.map(message => {
                let item = {
                    userId: message.userId._id,
                    username: message.userId.username,
                    userAvatar: message.userId.picture.thumbnail,
                    tourId: message.tourId,
                    data: message.data,
                    createdAt: message.createdAt
                };
                response.push(item);
            });
            console.log('Fetch this', response);
            res.status(200).json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: 'Internal server error',
                message: error.message
            })
        });
};

const createMessage = (payload) => {
    return MessageModel.create(payload);
};

module.exports = {
    getTourMessageHistory,
    createMessage
};