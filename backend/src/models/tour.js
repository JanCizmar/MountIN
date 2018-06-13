"use strict";

const mongoose = require('mongoose');

// Define the tour schema

const TourSchema  = new mongoose.Schema({
    //id: {
    //    type: String, //or int? todo
    //    required: true,
    //    unique: true
    //},
    name: {
        type: String,
        required: true
    },
    description: String,
    //image: [{ large: String, thumbnail: String }],
    image: {
        large: { type: String },
        thumbnail: { type: String}
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
    //creator: [{ username: String, professional: Boolean }], old version
    creator: {
        username: { type: String },
        professional: { type: Number,
        min:0,
        max:1}
    },
    route: {
        type: { type: String },
        coordinates: [[Number]]
    },
    rating: {
        type: Number,
        required: false,
        min: 0,
        max: 5
    }
});
TourSchema.index({ "route": "2dsphere" });
TourSchema.set('versionKey', false); //this
TourSchema.set('timestamps', true);

// Export the Movie model
module.exports = mongoose.model('Tour', TourSchema);