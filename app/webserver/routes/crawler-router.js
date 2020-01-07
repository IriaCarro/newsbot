'use strict';

const express = require('express');
const checkjwtToken = require('../../helper/check-jwt-token');

const getAllCrawlers = require('../controllers/crawler/get-all');

const router = express.Router();

router.get('/crawler/all', checkjwtToken, getAllCrawlers);

module.exports = router;