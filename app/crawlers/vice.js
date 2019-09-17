function getArticles($) {
    return $('.latest-feed__item .text-card .heading-hover').map(function (index, newsItem) {
        let title = newsItem.attribs.title;
        let url = 'https://www.vice.com' + newsItem.attribs.href;
        return { title: title, date: null, url: url, type: 3, sent: false, createddate: new Date()};
    });
}

module.exports = getArticles;