'use strict'

const Joi = require('joi');
const uuidV4 = require('uuid/v4');
const News = require('../model/news');

async function processArticles(articles) {
    for (let i = 0; i < articles.length; i++) {
        try {
            await validateSchema(articles[i]);
            if (await News.findOne({ url: articles[i].url }))
                continue;
            const news = new News(articles[i]);
            news.uuid = uuidV4();
    
            await news.save();
        } catch (e) {
            console.log(e);
        }
    }
}

async function validateSchema(payload) {
    return Joi.validate(payload, News);
}

module.exports = processArticles;