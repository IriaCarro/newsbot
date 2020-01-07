'use strict'

const Crawler = require('../../../model/crawlers');

async function getAll(req, res, next) {
      try {
            const crawlers = await Crawler.find();
            return res.status(200).json(crawlers);
      } catch (e) {
            console.log(e);
            return res.status(500).send(e.message);
      }
}

module.exports = getAll;