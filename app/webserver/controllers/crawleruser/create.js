'use strict'
const UserCrawler = require('../../../model/usercrawlers');
const getUtcDate = require('../../../helper/get-utc-date');

async function createCrawlerUser(req, res, next) {
    const crawlerUser = req.body;
    try {
        await validateSchema(crawlerUser);
        try {
            const cu = new UserCrawler(crawlerUser);
            cu.activeFrom = getUtcDate(new Date());
            await cu.save();
            return res.status(201).send();
        } catch (e) {
              return res.status(500).send(e.message);
        }
  } catch (e) {
        return res.status(400).send(e);
  }
}

module.exports = createCrawlerUser;