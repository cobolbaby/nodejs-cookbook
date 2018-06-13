const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await page.goto('https://app.shujuguan.cn');
    await page.screenshot({
        path: 'shujuguan.png',
        fullPage: true,
    });

    await browser.close();
})();