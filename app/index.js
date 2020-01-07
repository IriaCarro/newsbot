require('dotenv').config();
const Crawler = require("crawler");
const cron = require('node-schedule');
const mongoPool = require('../database/mongo-pool');

const initWebServer = require('./webserver/server');

const SendNews = require('./helper/sender');
const processArticles = require("./helper/articles");

const themedizinegetarticles = require('./crawlers/themedizine');
const applesferagetarticles = require('./crawlers/applesfera');
const highsnobietygetarticles = require('./crawlers/highsnobiety');
const gramosgetarticles = require('./crawlers/25gramos');
const vidaextragetarticles = require('./crawlers/vidaextra');
const vicegetarticles = require('./crawlers/vice');
const hypebeastgetarticles = require('./crawlers/hypebeast');
const xatakagetarticles = require('./crawlers/xataka');
const genbetagetarticles = require('./crawlers/genbeta');

var crawler = new Crawler({
    maxConnections : 10,
    callback : function (error, res, done) {
        if(error){
            return error;
        }
        const type = res.options.type;
        var $ = res.$;
        let articles = null;
        switch(type) {
            case "themedizine": articles = themedizinegetarticles($); break;
            case "applesfera": articles = applesferagetarticles($); break;
            case "highsnobiety": articles = highsnobietygetarticles($); break;
            case "25gramos": articles = gramosgetarticles($); break;
            case "vidaextra": articles = vidaextragetarticles($); break;
            case "vice": articles = vicegetarticles($); break;
            case "hypebeast": articles = hypebeastgetarticles($); break;
            case "xataka": articles = xatakagetarticles($); break;
        }
        processArticles(articles);
        done();
    }
});

async function initScheduler() {
      var ruleCrawler = new cron.RecurrenceRule();
      ruleCrawler.minute = process.env.CRAWLERMINUTE;
      var ruleSender = new cron.RecurrenceRule();
      ruleSender.minute = process.env.SENDERMINUTE;
      try {
            await mongoPool.connect();
            cron.scheduleJob(ruleCrawler, function(){
                console.log('Crawler working');
                crawler.queue({ uri: 'https://themedizine.com/categoria/musica/?utm_source=web&utm_medium=slider&utm_campaign=category', type: 'themedizine' });
                crawler.queue({ uri: 'https://www.applesfera.com/', type: 'xataka' });
                crawler.queue({ uri: 'https://www.highsnobiety.com/', type: 'highsnobiety'});
                crawler.queue({ uri: 'https://www.25gramos.com/category/news/', type: '25gramos'});
                crawler.queue({ uri: 'https://www.25gramos.com/category/lectura/', type: '25gramos'});
                crawler.queue({ uri: 'https://www.vidaextra.com/', type: 'vidaextra'});
                crawler.queue({ uri: 'https://www.vice.com/es', type: 'vice'});
                crawler.queue({ uri: 'https://hypebeast.com/', type: 'hypebeast'});
                crawler.queue({ uri: 'https://www.xataka.com/', type: 'xataka'});
                crawler.queue({ uri: 'https://www.genbeta.com/', type: 'xataka'});
            });
            cron.scheduleJob(ruleSender, function(){
                console.log('Sender working');
                SendNews();
            });
      } catch (e) {
          console.error(e);
          process.exit(1);
      }
}

initScheduler();
initWebServer();