"use strict";
const env = process.env.NODE_ENV || 'development';

const test = {
    app: {
        port: 3333,
        jwtSecret: process.env.JWT_SECRET  || 'very secret secret'
    },
    db: {
        name: 'testdb',
        host:'localhost',
        port: 27017
    }
};

const development = {
    app: {
        port: 3000,
        jwtSecret: process.env.JWT_SECRET  || 'very secret secret'
    },
    db: {
        name: 'tourdb',
        host:'localhost',
        port: 27017
    }
};

const config = {
    test,
    development
};

module.exports = config[env];