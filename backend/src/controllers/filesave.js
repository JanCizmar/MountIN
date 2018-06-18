"use strict";
const express = require('express');
const fileSaveModel = require('../models/filesave');


const upload=(req, res)=> {
    if (!req.files) return res.status(400).json({
            error: 'Bad Request',
            message: 'No file was chosen.'
        })
    let sampleFile = req.files.sampleFile;
    let uniqid = require('uniqid');
    let Jimp = require("jimp");
    let newFileName = uniqid()+".jpg";
    let body ={ file_name: sampleFile.name,
                sys_file_name: newFileName}
    Jimp.read(sampleFile.data).then(function (sample) {
        sample.resize(256, 256)            // resize
            .quality(80)                 // set JPEG quality
            .write("./upload/images/"+newFileName); // save
        })
        .then(fileSaveModel.create(body)
            .then(filesave => res.status(201).json(filesave))
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
    upload
};