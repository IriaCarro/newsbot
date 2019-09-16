const Crawler = require("crawler");
const cheerio = require('cheerio');
const News = require('../model/news');
const processArticles = require("../helper/articles");

var crawler25Gramos = new Crawler({
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
        let title = newsItem.children[7].attribs.title;
        let url = newsItem.children[7].attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = crawler25Gramos;