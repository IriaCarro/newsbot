'use strict';

const express = require('express');
const checkjwtToken = require('../../helper/check-jwt-token');

const getAllController = require('../controllers/crawleruser/get-all');
const deleteController = require('../controllers/crawleruser/delete');
const createController = require('../controllers/crawleruser/create');

const router = express.Router();

router.get('/crawleruser/all', checkjwtToken, getAllController);
router.post('/crawleruser', checkjwtToken, createController);
router.delete('/crawleruser', checkjwtToken, deleteController);

module.exports = router;