const News = require('../model/news');
const bot = require('../bots/beeBot');

function SendNews() {
    News.find({sent: false}).stream()
            .on('data', function(article){
                try {
                    send(article.url);
                    News.findOneAndUpdate({url: article.url}, {$set:{sent: true}},function(err, article){
                        if(err){
                            console.log("Something wrong when updating data!");
                        }
                    });
                }
                catch(e) {
                    console.error(e);
                }
            })
            .on('error', function(err){
                // handle error
            }
    );
}

function send(url) {
    setTimeout(function() {
            bot.telegram.sendMessage(process.env.NEWSCHAT, url);
        }, 2000);
}

module.exports = SendNews;