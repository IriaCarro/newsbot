'use strict';

const express = require('express');

const logincontroller = require('../controllers/user/login');
const signupcontroller = require('../controllers/user/signup');

const router = express.Router();

router.get('/user/login', logincontroller);
router.get('/user/signup', signupcontroller);

module.exports = router;