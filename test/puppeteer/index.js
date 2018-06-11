const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('https://app.shujuguan.cn');
    await page.screenshot({ path: 'shujuguan.png' });

    await browser.close();
})();