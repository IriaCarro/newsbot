function getArticles($) {
    return $('article h2').map(function (index, newsItem) {
        let title = newsItem.children[0].children[0].data;
        let url = newsItem.children[0].attribs.href;
        return { title: title, date: undefined, url: url, type: 2, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;