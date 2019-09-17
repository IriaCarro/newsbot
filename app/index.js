require('dotenv').config();
const cron = require('node-schedule');
const mongoPool = require('../database/mongo-pool');
const crawlerTM = require('./crawlers/themedizine');
const crawlerAS = require('./crawlers/applesfera');
const crawlerHS = require('./crawlers/highsnobiety');
const crawler25 = require('./crawlers/25gramos');
const crawlerVE = require('./crawlers/vidaextra');
const SendNews = require('./helper/sender');



async function init() {
      var ruleCrawler = new cron.RecurrenceRule();
      ruleCrawler.minute = process.env.CRAWLERMINUTE;
      var ruleSender = new cron.RecurrenceRule();
      ruleSender.minute = process.env.SENDERMINUTE;
      try {
            await mongoPool.connect();
            cron.scheduleJob(ruleCrawler, function(){
                console.log('Crawler working');
                crawlerTM.queue('https://themedizine.com/categoria/musica/?utm_source=web&utm_medium=slider&utm_campaign=category');
                crawlerAS.queue('https://www.applesfera.com/');
                crawlerHS.queue('https://www.highsnobiety.com/');
                crawler25.queue('https://www.25gramos.com/category/news/');
                crawler25.queue('https://www.25gramos.com/category/lectura/');
                crawlerVE.queue('https://www.vidaextra.com/');
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

init();