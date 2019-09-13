const Crawler = require("crawler");

let bot = require('../bots/themedizineBot');

var crawlerTheMedizine = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            return error;
        }
        var $ = res.$;
        printTitle($);
        printTitleNews($);
        done();
    }
});

function printTitle($) {
    console.log($("title").text());
}

function printTitleNews($) {
    $('.feed-item').each(function (index, newsItem) {
        let title = newsItem.childNodes[3].childNodes[1].children[3].children[0].children[0].data;
        console.log(title);
        let url = newsItem.children[1].children[1].children[1].attribs.href;
        console.log(url);
        let date = newsItem.children[3].children[3].children[3].children[1].data;
        console.log(date);
        
        bot.telegram.sendMessage(process.env.NEWSCHAT, url)
    });
}

module.exports = crawlerTheMedizine;