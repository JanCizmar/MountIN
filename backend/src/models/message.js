"use strict";

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the message schema

const MessageSchema  = new mongoose.Schema({
    tourId: {
        type: ObjectId, ref: 'Tour',
        required: true,
        index: true
    },
    creator: {
        type: ObjectId, ref: 'User',
        required: true
    },
    data: {
        type: String,
        required: true,
    }
});

MessageSchema.set('versionKey', false);
MessageSchema.set('timestamps', true);

module.exports = mongoose.model('Message', MessageSchema);