const Telegraf = require('telegraf');
const token = process.env.THEMEDIZINEBOTTOKEN;

const bot = new Telegraf(token);
module.exports = bot;