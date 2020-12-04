const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

async function main() {
  //= ========================================== Axios ======================================
  async function twittFunc() {
    try {
      const response = await axios('https://3dnews.ru/news');
      const result = response.data;
      return result;
    } catch (error) {
      console.error(error);
    }
  }
  const twitter = await twittFunc();
  //= ========================================== Cheerio ======================================
  const $ = cheerio.load(twitter);
  const header = [];
  const news = [];
  $('a.entry-header > h1').each((i, element) => {
    const title = $(element).text();
    header.push(title);
  });
  $('div.cntPrevWrapper > p').each((i, element) => {
    const newsBody = $(element).text();
    news.push(newsBody);
  });

  const allData = header.map((element, i) => [element, news[i]]);
  const newAllDada = allData.slice(0, 15);
  return newAllDada;
}
const resultArray = main();
module.exports = resultArray;
