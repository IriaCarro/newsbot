const News = require('../model/news');
const bot = require('../bots/beeBot');

function SendNews() {
    const articles = News.find({sent: false});
    for (let i = 0; i < articles.length; i++) {
        send(articles[i].url);
        articles[i].sent = true;
        articles[i].save();
    }
}

function send(url) {
    setTimeout(function() {
            bot.telegram.sendMessage(process.env.NEWSCHAT, url);
        }, 200);
}

module.exports = SendNews;