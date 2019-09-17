const News = require('../model/news');
const bot = require('../bots/beeBot');

function SendNews() {
    const articles = News.find({sent: false});
    News.find({sent: false}).stream()
            .on('data', function(doc){
                // handle doc
                try {
                    send(doc.url);
                    News.findOneAndUpdate({url: doc.url}, {$set:{sent: true}},function(err, doc){
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