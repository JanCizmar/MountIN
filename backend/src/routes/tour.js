"use strict";

const express  = require('express');
const router   = express.Router();

const TourController = require('../controllers/tour');


router.get('/', TourController.list); // List all tours
router.post('/', TourController.create); // Create a new tour
router.get('/search', TourController.search);    // Search for a tour
router.get('/:id', TourController.read); // Read a tour by Id
router.put('/:id', TourController.update); // Update a tour by Id
router.delete('/:id', TourController.remove); // Delete a tour by Id


module.exports = router;