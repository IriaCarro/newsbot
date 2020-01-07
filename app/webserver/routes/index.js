'use strict';

const userRouter = require('./user-router');
const crawlerRouter = require('./crawler-router.js');
const crawlerUserRouter = require('./crawler-router.js');

module.exports = {
      userRouter,
      crawlerRouter,
      crawlerUserRouter
};