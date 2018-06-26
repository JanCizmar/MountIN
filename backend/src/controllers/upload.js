"use strict";
const express = require('express');
const fileModel = require('../models/file');


const image = (req, res) => {
    if (!req.files) return res.status(400).json({
        error: 'Bad Request',
        message: 'No file was chosen.'
    });
    let image = req.files.image;
    let uniqid = require('uniqid');
    let Jimp = require("jimp");
    let newFileName = uniqid() + ".jpg";
    let body = {
        file_name: image.name,
        sys_file_name: newFileName
    };
    Jimp.read(image.data).then(function (sample) {
        sample.resize(256, 256)            // resize
            .quality(80)                 // set JPEG quality
            .write("./upload/images/" + newFileName); // save
    })
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