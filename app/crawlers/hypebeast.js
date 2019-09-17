function getArticles($) {
    return $('.post-box-content-title').map(function (index, newsItem) {
        let title = newsItem.children[0].attribs.title;
        let url = newsItem.children[0].attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;