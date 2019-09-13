const Crawler = require("crawler");
const cheerio = require('cheerio');
const News = require('../model/news');
const processArticles = require("../helper/articles");

var crawlerHighSnobiety = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            return error;
        }
        var $ = res.$;
        const articles = getArticles($);
        processArticles(articles);
        done();
    }
});

function getArticles($) {
    return $('article').map(function (index, newsItem) {
        const item = cheerio.load(newsItem);
        const title = item('.teaser__title').text().replace('\t', '').replace('\n', '');
        const date = item('.teaser__meta--date').text();
        const url = item('.teaser__title')[0].attribs.href;
        return new News(title, date, url, 0);
    });
}

module.exports = crawlerHighSnobiety;