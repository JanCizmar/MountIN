"use strict";

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the message schema

const MessageSchema = new mongoose.Schema({
    tourId: {
        type: ObjectId, ref: 'Tour',
        required: true,
        index: true
    },
    userId: {
        type: ObjectId, ref: 'User',
        required: true
    },
    data: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

MessageSchema.set('versionKey', false);

module.exports = mongoose.model('Message', MessageSchema);