function getArticles($) {
    return $('article').map(function (index, newsItem) {
        if (newsItem.children[7] == undefined || newsItem.children[7].attribs == undefined) {
            return null;
        }
        let title = newsItem.children[7].attribs.title;
        let url = newsItem.children[7].attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;