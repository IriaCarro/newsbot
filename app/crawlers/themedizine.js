const parse = require('date-fns/parse')

function getArticles($) {
    return $('.feed-item').map(function (index, newsItem) {
        let title = newsItem.childNodes[3].childNodes[1].children[3].children[0].children[0].data;
        let url = newsItem.children[1].children[1].children[1].attribs.href;
        let datestring = newsItem.children[3].children[3].children[3].children[1].data.trim();
        let date = parse(datestring, 'dd-MM-yyyy', new Date());
        return { title: title, date: date, url: url, type: 1, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;