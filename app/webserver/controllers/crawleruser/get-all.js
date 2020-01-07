'use strict'
const UserCrawler = require('../../../model/usercrawlers');

async function getAll(req, res, next) {
    const userid = req.query.userid;
    try {
          const crawlersUser = await UserCrawler.find({ userid: userid});
          if (crawlersUser) {
                return res.status(200).json(crawlersUser);
          } else {
                return res.status(200).send('Any crawlers available');
          }
    } catch (e) {
          console.log(e);
          return res.status(500).send(e.message);
    }
}

module.exports = getAll;