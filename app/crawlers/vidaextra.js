const Crawler = require("crawler");
const cheerio = require('cheerio');
const News = require('../model/news');
const processArticles = require("../helper/articles");

var crawlerVidaExtra = new Crawler({
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
    return $('article .abstract-title').map(function (index, newsItem) {
        let title = newsItem.children[0].children[0].data;
        let url = newsItem.children[0].attribs.href;
        // let title = newsItem.children[7].attribs.title;
        // let url = newsItem.children[7].attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = crawlerVidaExtra;