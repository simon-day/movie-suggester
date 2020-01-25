const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 8000;
const scraper = require('./scraper');
const puppeteer = require('puppeteer');
const scrollToBottom = require('scroll-to-bottomjs');

app.get('/', async (req, res) => {
  res.send('TEST');
});

app.get('/movies', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  const { releaseStart, releaseEnd, type } = req.query;
  console.log(req.query);
  const movies = [];

  const getMovies = async (
    start = releaseStart || '1990-01-01',
    end = releaseEnd || '2019-12-31',
    genre = type || 'comedy'
  ) => {
    let minRating = 7;

    if (genre === 'horror') {
      minRating = 6.6;
    }

    console.log('minRating: ', minRating);

    const url = `https://www.imdb.com/search/title/?title_type=feature&release_date=${start},${end}&user_rating=${minRating},&online_availability=US%2Ftoday%2FAmazon%2Fsubs,US%2Ftoday%2FAmazon%2Fpaid,GB%2Ftoday%2FAmazon%2Fsubs,GB%2Ftoday%2FAmazon%2Fpaid&num_votes=10000,&genres=${genre}&languages=en&view=advanced&count=250`;

    (async () => {
      const browser = await puppeteer.launch({
        headless: true
        // args: ['--lang=en-GB']
      });
      const page = await browser.newPage();
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US'
      });
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

      let pageCount = 1;
      if (totalResults > 250) {
        pageCount = Math.ceil(totalResults / 250);
      }

      console.log('pageCount: ', pageCount);

      for (let i = 0; i < pageCount; i++) {
        const newUrl = `https://www.imdb.com/search/title/?title_type=feature&release_date=${start},${end}&user_rating=${minRating},&online_availability=US%2Ftoday%2FAmazon%2Fsubs,US%2Ftoday%2FAmazon%2Fpaid,GB%2Ftoday%2FAmazon%2Fsubs,GB%2Ftoday%2FAmazon%2Fpaid&num_votes=10000,&genres=${genre}&languages=en&view=advanced&count=250&start=${i *
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

          let imageURL = await item.$eval('img', image => image.src);

          const replaceTable = {
            UX67: 'UX182',
            UY98_CR1: 'UY268_CR4',
            UY98_CR0: 'UY268_CR4',
            UY98_CR2: 'UY268_CR4',
            UY98_CR3: 'UY268_CR4',
            '0,67,98': '0,182,268'
          };

          imageURL = imageURL.replace(
            /(UX67)|(UY98_CR0)|(UY98_CR1)|(UY98_CR2)|(UY98_CR3)|(0,67,98)/gi,
            function(matched) {
              return replaceTable[matched];
            }
          );

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

      await browser.close();

      res.send(movies);
    })();
  };

  getMovies();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
