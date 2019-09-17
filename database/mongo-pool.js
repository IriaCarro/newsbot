'use strict'

const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const mongoUri = process.env.MONGO_URI; 

async function connect() {
      const connection = await mongoose.connect(mongoUri);

      return connection;
}

async function disconnect() {
      mongoose.connection.close();
}

module.exports = {
      connect,
      disconnect,
};