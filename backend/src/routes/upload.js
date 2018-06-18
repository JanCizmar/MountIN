"use strict";

const express  = require('express');
const router   = express.Router();
const fileUpload = require('express-fileupload');
//const app = express();
const UploadController = require('../controllers/upload');
// default options
router.use(fileUpload({ preserveExtension: true }));

router.post('/image', UploadController.image); // Create a new movie

module.exports = router;