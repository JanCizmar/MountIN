"use strict";
const fileModel = require('../models/file');
const uniqid = require('uniqid');
const Jimp = require("jimp");
const fs = require("fs");

const uploadDir = './upload/files/';

const image = async (req, res) => {
    if (!req.files) return res.status(400).json({
        error: 'Bad Request',
        message: 'No file was chosen.'
    });
    let image = req.files.image;

    try {
        let response = {
            large: uniqid() + ".jpg",
            thumbnail: uniqid() + ".jpg"
        };
        //creating large image
        await Jimp.read(image.data).then(function (sample) {
            sample.cover(1024, 768)            // resize
                .quality(80)                 // set JPEG quality
                .write("./upload/images/" + response.large); // save
        });
        //creating small image
        await Jimp.read(image.data).then(function (sample) {
            sample.cover(1024, 768)            // resize
                .quality(80)                 // set JPEG quality
                .write("./upload/images/" + response.thumbnail); // save
        });
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({
            error: err,
            message: 'File could not be uploaded.'
        });
    }
};

const file = (req, res) => {
    if (!req.files) return res.status(400).json({
        error: 'Bad Request',
        message: 'No file was chosen.'
    });
    let file = req.files.file;
    let uniqid = require('uniqid');
    let fileExtension = require('file-extension');
    let ext = fileExtension(file.name);
    let newFileName = uniqid() + "." + ext;
    //creates files directory
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    file.mv(uploadDir + newFileName)
        .then(() => res.status(201).json(newFileName))
        .catch(error => res.status(500).json({
            error: 'Internal server error',
            message: error.message
        }));

};

module.exports = {
    image,
    file
};