'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userCrawlerSchema = new Schema({
    userid: { type: String, unique: false, required: true  },
    crawlerid: { type: String, unique: false, required: true  },
    activeFrom: { type: Date, unique: false, required: true },
    activeTo: { type: Date, unique: false, required: false }
});

const UserCrawler = mongoose.model('UserCrawler', userCrawlerSchema);

module.exports = UserCrawler;