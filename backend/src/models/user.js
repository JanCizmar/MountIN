"use strict";

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: String,
    picture: {
        large: {type: String},
        thumbnail: {type: String}
    },
    certificate: {
        type: String,
        required: false
    },
    professional: {
        type: Boolean,
        required: false,
        unique: false
    },
    tours: [{type: ObjectId, ref: 'Tour'}],
    toursAttending: [{type: ObjectId, ref: 'Tour'}]
});

UserSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);