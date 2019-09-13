const Crawler = require("crawler");
const News = require("../model/news");
const processArticles = require("../helper/articles");

var crawlerAppleSfera = new Crawler({
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
    return $('article h2').map(function (index, newsItem) {
        let title = newsItem.children[0].children[0].data;
        let url = newsItem.children[0].attribs.href;
        return new News(title, undefined, url, 2);
    });
}

module.exports = crawlerAppleSfera;