const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://ddqnov.eu', {waitUntil: 'networkidle2'});
    console.log(page.url());

    await page.type('input[name=s]', 'ffmpeg');

    //await page.$eval('.search-form', form => form.submit());
    const searchForm = await page.$('.search-form');
    await searchForm.evaluate(searchForm => searchForm.submit());
    await page.waitForNavigation();

    console.log('done, creating a screenshot');

    // get text of elements
    let searchResult = [];
    let elements = await page.$$('.blog-post-title');
    for (const element of elements) {
        searchResult.push(await element.evaluate(el => el.textContent));
    }
    console.log(searchResult);

    // get text of one element
    // let element = await page.$('.blog-post-title');
    // let value = await element.evaluate(el => el.textContent);
    // console.log(value);

    await page.screenshot({path: 'example.png'});

    await browser.close();
})();