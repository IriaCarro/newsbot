'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const crawlerSchema = new Schema({
    _id: { type: String, unique: true, required: true  },
    title: { type: String, unique: true, required: true  },
    url: { type: String, unique: true, required: true },
    type: { type: Number, required: true }
});

const Crawler = mongoose.model('Crawler', crawlerSchema);

module.exports = Crawler;