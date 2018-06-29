"use strict";
const fileModel = require('../models/file');
const uniqid = require('uniqid');
const Jimp = require("jimp");

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
    let body = {
        file_name: file.name,
        sys_file_name: newFileName
    };
    file.mv('./upload/files/' + newFileName)
        .then(fileModel.create(body)
            .then(file => res.status(201).json(file))
            .catch(error => res.status(500).json({
                error: 'Internal server error',
                message: error.message
            })))
        .catch(err => res.status(500).json({
            error: err,
            message: 'File could not be uploaded.'
        }))
};

module.exports = {
    image,
    file
};