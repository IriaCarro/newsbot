const express = require('express');
const app = express();
require('dotenv').config();

const crawlerTM = require('./crawlers/themedizine');

app.get('/scrapeTM', function(req, res){
    let url = 'https://themedizine.com/categoria/musica/?utm_source=web&utm_medium=slider&utm_campaign=category';
    crawlerTM.queue(url);
    res.send('ok');
})

app.get('/hello', function (req, res) {
    res.send('Hello World!');
});

app.listen('8000')
console.log('Magic happens on port 8000');
// module.exports = app;