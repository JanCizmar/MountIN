"use strict";

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
// Define the tour schema

const TourSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    //image: [{ large: String, thumbnail: String }],
    image: {
        large: {type: String},
        thumbnail: {type: String}
    },
    date: {
        type: Date,
        required: true
    },
    difficulty: {
        type: Number,
        required: false
    },
    cost: Number,
    type: {
        type: Number,
        required: true,
        min: 0,
        max: 5 //todo maybe change
    },

    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},

    route: {
        type: {type: String, default: 'MultiPoint'},
        coordinates: [[Number]]
    },
    //route: [[{ lat: Number, lon: Number }]],
    //or in the nested way if this way not working! http://mongoosejs.com/docs/schematypes.html
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    },
    participants: [{ type: ObjectId, ref: 'User' }]
});

TourSchema.index({ "route": "2dsphere" });
TourSchema.set('versionKey', false); //this
TourSchema.set('timestamps', true);

// Export the Movie model
module.exports = mongoose.model('Tour', TourSchema);