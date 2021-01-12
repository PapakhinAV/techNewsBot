const { Telegraf } = require('telegraf');
require('dotenv').config();
const resultArray = require('./app');

// async function randomNews() {
//   const news = await resultArray;
//   return news;
// }
// const news = randomNews();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Ask me "news"'));
bot.help((ctx) => ctx.reply('Ask me "news"'));
// bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('news', async (ctx) => {
  const news = await resultArray;
  news.forEach((element) => {
    // console.log(`\n${element[0]}:\n${element[1]}\n`);
    ctx.replyWithHTML(`<b>${element[0]}</b>:\n\n${element[1]}\n${element[2]}`);
    // ctx.replyWithHTML(`${element[2]}`);
  });
});

bot.launch();
console.log('Bot - started');
