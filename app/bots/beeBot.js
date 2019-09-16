const Telegraf = require('telegraf');
const rateLimit = require('telegraf-ratelimit');
const token = process.env.BEEEEEEBOTTOKEN;
// Set limit to 1 message per 3 seconds
const limitConfig = {
    window: 1000,
    limit: 5,
    onLimitExceeded: (ctx, next) => ctx.reply('Rate limit exceeded')
  }

const bot = new Telegraf(token);
bot.use(rateLimit(limitConfig))
module.exports = bot;