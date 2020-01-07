'use strict'
const UserCrawler = require('../../../model/usercrawlers');

async function deleteCrawlerForUser(req, res, next) {
    const uuid = req.query.uuid;
    try {
        UserCrawler.deleteOne({ uuid: uuid });
        return res.status(200).send();
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

module.exports = deleteCrawlerForUser;