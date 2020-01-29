const express = require('express');
const path = require('path');
const app = express();
const puppeteer = require('puppeteer');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 8000;

console.log('Prcoess env node env: ', ENV);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

app.get('/trailer', (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--headless']
    });
    const page = await browser.newPage();
    await page.goto(
      'https://www.youtube.com/results?search_query=Goodfellas+1990+trailer'
    );

    const videoLink = await page.evaluate(
      () => document.querySelector('#video-title').href
    );
    console.log(videoLink);
    await page.screenshot({ path: 'example.png' });

    await browser.close();
  })();
  // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  // const { title } = req.query;
  // console.log(title);

  // const getTrailer = async () => {
  //   const url = `https://www.youtube.com/results?search_query=${title}+trailer`;
  //   (async () => {
  //     try {
  //       const browser = await puppeteer.launch({
  //         headless: false
  //         // args: ['--no-sandbox']
  //       });
  //       const page = await browser.newPage();
  //       await page.setExtraHTTPHeaders({
  //         'Accept-Language': 'en-US'
  //       });
  //       await page.goto(url, { waitUntil: 'domcontentloaded' });
  //       console.log(page);
  //       // await page.waitForSelector('#video-title');
  //       console.log('here');

  //       const videoLink = await page.evaluate(
  //         () => document.querySelector('#video-title').href
  //       );

  //       const s = videoLink.replace('https://www.youtube.com/watch?v=', '');
  //       res.send(s);

  //       await browser.close();
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   })();
  // };

  // getTrailer();
});

if (ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// module.exports = app;
