const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    // 设置浏览器视窗
    page.setViewport({
        width: 1376,
        height: 768,
    });
    await page.goto('https://app.shujuguan.cn');
    await page.screenshot({
        path: 'saved.png',
        fullPage: true,
    });

    await browser.close();
})();