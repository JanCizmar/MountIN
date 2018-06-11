"use strict";

const mongoose = require('mongoose');

// Define the rentalAgency schema

const RentalAgency  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
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

// Export the Movie model
module.exports = mongoose.model('RentalAgency', RentalAgency);