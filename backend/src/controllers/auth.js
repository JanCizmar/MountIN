"use strict";

const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcryptjs');

const config     = require('../config');
const UserModel  = require('../models/user');


const login = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    UserModel.findOne({username: req.body.username}).exec()
        .then(user => {

            // check if the password is valid
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
            //if (!isPasswordValid) return res.status(401).send({token: null , error: 'Wrong password'});
            if (!isPasswordValid) return res.status(404).json({
                error: 'Wrong password',
                message: 'Please check if you entered the right password'
            });

            // if user is found and password is valid
            // create a token
            const token = jwt.sign({ id: user._id, username: user.username }, config.app.jwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});

        })
        .catch(error => res.status(404).json({
            error: 'User Not Found',
            message: error.message
        }));

};


const register = (req,res) => {
    if (!Object.prototype.hasOwnProperty.call(req.body, 'password')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a password property'
    });

    if (!Object.prototype.hasOwnProperty.call(req.body, 'username')) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body must contain a username property'
    });

    const user = Object.assign(req.body, {password: bcrypt.hashSync(req.body.password, 8)});


    UserModel.create(user)
        .then(user => {

            // if user is registered without errors
            // create a token
            const token = jwt.sign({ id: user._id, username: user.username }, config.app.jwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).json({token: token});


        })
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    error: 'Username or email already used',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });

};


const me = (req, res) => {
    UserModel.findById(req.userId).select('username').exec()
        .then(user => {

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));
};

const logout = (req, res) => {
    res.status(200).send({ token: null });
};

const read = (req, res) => {
    UserModel.findById(req.params.id).populate('tours toursAttending').exec()
        .then(user => {

            user.password = "";
            //user = {...user};
            //delete user["password"];

            if (!user) return res.status(404).json({
                error: 'Not Found',
                message: `User not found`
            });

            res.status(200).json(user)

        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error',
            message: error.message
        }));

};

const update = (req, res) => {
    if (Object.keys(req.body).length === 0) return res.status(400).json({
        error: 'Bad Request',
        message: 'The request body is empty'
    });
    if (!req.body._id) return res.status(400).json({
        error: 'Bad Request',
        message: 'There is no _id in the body'
    });

    //delete req.body.password;

    UserModel.findByIdAndUpdate(req.body._id, req.body, {new: true, runValidators: true}).exec()
        .then(user => res.status(200).json(user))
        .catch(error => {
            if (error.code === 11000) {
                res.status(400).json({
                    error: 'Email already in use',
                    message: error.message
                })
            }
            else{
                res.status(500).json({
                    error: 'Internal server error',
                    message: error.message
                })
            }
        });
};


module.exports = {
    login,
    register,
    logout,
    me,
    read,
    update
};