'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = new Schema({
    uuid: { type: String, unique: true, required: true  },
    title: { type: String, unique: true, required: true  },
    date: { type: Date },
    url: { type: String, unique: true, required: true },
    type: { type: Number, required: true },
    sent: { type: Boolean, required: true }
});

const News = mongoose.model('News', newsSchema);

module.exports = News;