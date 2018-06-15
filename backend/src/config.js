"use strict";

//Configuration variables
const port      = process.env.PORT        || '3000';
const dbname = process.env.DB_NAME || 'tourdb';
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/' + dbname;
const JwtSecret = process.env.JWT_SECRET  ||'very secret secret';

module.exports = {
    port,
    mongoURI,
    JwtSecret,
};