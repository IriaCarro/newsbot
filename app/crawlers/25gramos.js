function getArticles($) {
    return $('article').map(function (index, newsItem) {
        let title = newsItem.children[7].attribs.title;
        let url = newsItem.children[7].attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;