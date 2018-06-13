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
    //creator: [{ username: String, professional: Boolean }],
    creator: {
        username: { type: String },
        professional: { type: Number,
        min:0,
        max:1}
    },
    //route: [[{ lat: Number, lon: Number }]],
    route: {
        //working version: but hard to create index
        type: { type: String },
        coordinates: [[Number]]
    },
    //or in the nested way if this way not working! http://mongoosejs.com/docs/schematypes.html
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