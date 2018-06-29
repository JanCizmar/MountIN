"use strict";

const express        = require('express');
const router         = express.Router();

const middlewares    = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/me', middlewares.checkAuthentication , AuthController.me);
router.get('/profile/:id' , AuthController.read);
router.get('/logout', AuthController.logout);
router.post('/update', AuthController.update);

module.exports = router;