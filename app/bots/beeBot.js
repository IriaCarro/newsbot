const Telegraf = require('telegraf');
const token = process.env.BEEEEEEBOTTOKEN;

const bot = new Telegraf(token);
module.exports = bot;