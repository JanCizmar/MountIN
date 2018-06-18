"use strict";

const express  = require('express');
const router   = express.Router();
const fileUpload = require('express-fileupload');
//const app = express();
const FileSaveController = require('../controllers/filesave');
// default options
router.use(fileUpload({ preserveExtension: true }));

router.post('/upload', FileSaveController.upload); // Create a new movie

module.exports = router;