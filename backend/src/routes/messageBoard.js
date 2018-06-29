"use strict";

const express = require('express');
const router = express.Router();

const MessageBoardController = require('../controllers/messageBoardController');

// Returns all messages of a specific tour
router.get('/:tourId', MessageBoardController.getTourMessageHistory);

module.exports = router;