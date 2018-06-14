"use strict";

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

// Define the user schema

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        large: {data: Buffer, imageType: String},
        thumbnail: {data: Buffer, imageType: String}
    },
    certificate: {
        data: Buffer, imageType: String
    },
    isInstructor: Boolean,
    tours: [{ type: ObjectId, ref: 'Tour' }]
        unique: false
    },
    professional: {
        type: Boolean,
        required: false,
        unique: false
    }
});

UserSchema.set('versionKey', false);

// Export the Movie model
module.exports = mongoose.model('User', UserSchema);