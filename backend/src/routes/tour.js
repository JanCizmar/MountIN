"use strict";
const express  = require('express');
const router   = express.Router();
const TourController = require('../controllers/tour');
const middlewares = require('../middlewares');

router.get('/', TourController.list); // List all tours
router.put('/join/:id', middlewares.checkAuthentication, TourController.join); // List all tours
router.post('/', middlewares.checkAuthentication, TourController.create); // Create a new tour
router.get('/search', TourController.search);    // Search for a tour
router.get('/:id', TourController.read); // Read a tour by Id
router.post('/update', TourController.update);
router.delete('/:id', TourController.remove); // Delete a tour by Id
router.get('/:id/participants', TourController.getParticipants); // Get tour participants


module.exports = router;