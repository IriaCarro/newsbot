const cheerio = require('cheerio');

function getArticles($) {
    return $('article').map(function (index, newsItem) {
        const item = cheerio.load(newsItem);
        const title = item('.teaser__title').text().replace('\t', '').replace('\n', '').trim();
        const date = item('.teaser__meta--date').text();
        const url = item('.teaser__title')[0].attribs.href;
        return { title: title, date: date, url: url, type: 0, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;