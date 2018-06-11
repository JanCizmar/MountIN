"use strict";

const express  = require('express');
const router   = express.Router();

const RentalAgencyController = require('../controllers/rentalAgency');


router.get('/', RentalAgencyController.list); // List all rental agencies
router.post('/', RentalAgencyController.create); // Add a new rental agency

module.exports = router;