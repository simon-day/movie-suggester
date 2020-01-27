const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const scrollToBottom = require('scroll-to-bottomjs');

const movies = [];

const getMovies = async (
  releaseStart = '1990-01-01',
  releaseEnd = '2019-12-31',
  genre = 'comedy',
  pageStartNum = 1
) => {
  const url = `https://www.imdb.com/search/title/?title_type=feature&release_date=${releaseStart},${releaseEnd}&user_rating=7.8,&num_votes=5000,&genres=${genre}&languages=en&view=advanced&count=250&start=${pageStartNum}`;

  (async () => {
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
    await page.goto(url);

    const resultsDescText = await page.evaluate(
      () => document.querySelector('.desc').innerText
    );

    let totalResults;

    if (resultsDescText.split(' ').length === 3) {
      totalResults = resultsDescText.split(' ')[2];
    } else {
      totalResults = resultsDescText.split(' ')[0];
    }

    console.log(totalResults);

    let pageCount = 1;

    if (totalResults > 250) {
      pageCount = Math.ceil(totalResults / 250);
    }

    console.log('pageCount: ', pageCount);

    for (let i = 0; i < pageCount; i++) {
      const newUrl = `https://www.imdb.com/search/title/?title_type=feature&release_date=${releaseStart},${releaseEnd}&user_rating=7.8,&num_votes=5000,&genres=${genre}&languages=en&view=advanced&count=250&start=${i *
        250 +
        1}`;
      await page.goto(newUrl);

      await page.evaluate(scrollToBottom);
      await page.waitFor(200);

      const listerItems = await page.$$('.lister-item');

      for (const item of listerItems) {
        const title = await item.$eval(
          '.lister-item-header a',
          title => title.text
        );
        const link = await item.$eval(
          '.lister-item-header a',
          link => link.href
        );

        const imdbId = link.match(/(tt\d{5,7})/gi);
        console.log(imdbId);

        let imageURL = await item.$eval('img', image => image.src);

        const replaceTable = {
          UX67: 'UX182',
          '0,67,98': '0,182,268'
        };

        imageURL = imageURL.replace(/(UX67)|(0,67,98)/gi, function(matched) {
          return replaceTable[matched];
        });

        const rating = await item.$eval('.ratings-imdb-rating', rating =>
          rating.getAttribute('data-value')
        );

        const summary = await item.$eval(
          '.lister-item-content p:nth-child(4)',
          sum => sum.textContent.trim()
        );
        await movies.push({ title, link, imageURL, rating, summary });
      }
    }

    console.log(movies.length);

    await browser.close();

    return movies;
  })();
};

module.exports = {
  getMovies
};
