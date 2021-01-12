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
  const img = [];
  $('a.entry-header > h1').each((i, element) => {
    const title = $(element).text();
    header.push(title);
  });
  $('div.cntPrevWrapper > p').each((i, element) => {
    const newsBody = $(element).text();
    news.push(newsBody);
  });
  $('div.imgPrevWrapper>a').each((i, element) => {
    const newsImg = $(element).attr('href');
    img.push(`https://3dnews.ru/${newsImg}`);
  });
  // console.log(img);
  const allData = header.map((element, i) => [element, news[i], img[i]]);
  const newAllDada = allData.slice(0, 15);
  return newAllDada;
}
const resultArray = main();
module.exports = resultArray;
