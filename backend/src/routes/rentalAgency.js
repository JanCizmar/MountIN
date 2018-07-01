"use strict";

const express  = require('express');
const router   = express.Router();

const RentalAgencyController = require('../controllers/rentalAgency');

// Takes latitude, longitude and optional distance and lists all nearby rental agencies
router.get('/', RentalAgencyController.findNearbyAgencies);
router.post('/', RentalAgencyController.create);

module.exports = router;