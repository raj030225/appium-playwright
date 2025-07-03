import { Browser, BrowserContext, Page } from '@playwright/test';
import playwright from 'playwright';
import { writeFile } from 'fs/promises';


export class WebDriver {
    private static browser: Browser;
    private static context: BrowserContext;
    private static page: Page;

    static async init() {
        this.browser = await playwright.chromium.launch({
            headless: false
        });
        this.context = await this.browser.newContext();
        this.page = await this.context.newPage();

        console.log('*****************************************************************');
        const jsonData = JSON.stringify(this.browser, null, 2); // Pretty print
        console.log(jsonData);
    }

    static getPage(): Page {
        return this.page;
    }

    static async close() {
        await this.browser.close();
    }
}
