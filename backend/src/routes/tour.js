"use strict";

const express  = require('express');
const router   = express.Router();

const TourController = require('../controllers/tour');


router.get('/', TourController.list); // List all movies
router.post('/', TourController.create); // Create a new movie
router.get('/:id', TourController.read); // Read a movie by Id
router.put('/:id', TourController.update); // Update a movie by Id
router.delete('/:id', TourController.remove); // Delete a movie by Id
router.get('/:id/participants', TourController.getParticipants); // Get participants of a tour


module.exports = router;