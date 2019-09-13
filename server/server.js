require('dotenv').config();
const mongoPool = require('../database/mongo-pool');
const crawlerTM = require('./crawlers/themedizine');
const crawlerAS = require('./crawlers/applesfera');
const crawlerHS = require('./crawlers/highsnobiety');

async function init() {
    try {
          await mongoPool.connect();
          crawlerTM.queue('https://themedizine.com/categoria/musica/?utm_source=web&utm_medium=slider&utm_campaign=category');
          // crawlerAS.queue('https://www.applesfera.com/');
          // crawlerHS.queue('https://www.highsnobiety.com/');
    } catch (e) {
          console.error(e);
          process.exit(1);
    }
}

init();