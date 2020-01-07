'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    uuid: { type: String, unique: true, required: true  },
    email: { type: String, unique: true, required: true  },
    hash: { type: String, unique: true, required: true  },
    name: { type: String, unique: true, required: true  },
    password: { type: String, unique: true, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;