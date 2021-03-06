"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const tour = require('./routes/tour');
const rentalAgency = require('./routes/rentalAgency');
const messageBoard = require('./routes/messageBoard');
const upload = require('./routes/upload');

const api = express();


// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'MountIN REST API'
    });
});

// API routes
api.use('/auth', auth);
api.use('/tours', tour); //todo: use the same name here?
api.use('/rentalAgency', rentalAgency);
api.use('/messageBoard', messageBoard);
api.use('/upload', upload);
api.use('/uploaded', express.static('upload'));

module.exports = api;