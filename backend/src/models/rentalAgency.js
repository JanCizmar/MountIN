"use strict";

const mongoose = require('mongoose');

// Define the rentalAgency schema

const RentalAgency  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {type: String, default: 'Point'},
        coordinates: [Number]
    },
    website: {
        type: String,
        required: true
    },
    contact: {
        email: String,
        phone: String
    },
    equipmentTypes: [String]
});

RentalAgency.set('timestamps', true);
RentalAgency.index({'location': '2dsphere'});

// Export the Movie model
module.exports = mongoose.model('RentalAgency', RentalAgency);