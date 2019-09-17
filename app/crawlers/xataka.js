function getArticles($) {
    return $('article .abstract-title').map(function (index, newsItem) {
        let title = newsItem.children[0].children[0].data;
        let url = newsItem.children[0].attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;