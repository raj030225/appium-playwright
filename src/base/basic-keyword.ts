import { Page, chromium, Browser, BrowserContext } from '@playwright/test';
import { remote, Browser as AppiumBrowser } from 'webdriverio';

export class BasicKeyword {
    private playwrightBrowser?: Browser;
    private playwrightContext?: BrowserContext;
    private playwrightPage?: Page;
    private appiumDriver?: AppiumBrowser;

    constructor(
        playwrightPage?: Page,
        appiumDriver?: AppiumBrowser
    ) {
        if (playwrightPage) this.playwrightPage = playwrightPage;
        if (appiumDriver) this.appiumDriver = appiumDriver;
    }

    // --- Playwright Initializer ---
    static async launchPlaywright(): Promise<{ browser: Browser, context: BrowserContext, page: Page }> {
        const browser = await chromium.launch({ headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();

        console.log('Browser :--> ', browser);
        console.log('Context :--> ', context);
        console.log('Page :--> ', page);
        return { browser, context, page };
    }

    async setPlaywright(page: Page, context?: BrowserContext, browser?: Browser) {
        this.playwrightPage = page;
        if (context) this.playwrightContext = context;
        if (browser) this.playwrightBrowser = browser;
    }

    // --- Appium Initializer ---
    static async launchAppium(options: any): Promise<AppiumBrowser> {
        return await remote(options);
    }

    async setAppium(driver: AppiumBrowser) {
        this.appiumDriver = driver;
    }

    public getAppiumDriver(): AppiumBrowser | undefined {
        return this.appiumDriver;
    }

    // --- Playwright Actions ---

    async pwClick(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.pwDrawBorder(selector); // Draw border for debugging
        await this.playwrightPage.click(selector);
        await this.playwrightPage.waitForTimeout(2000); // Wait for 1 second to ensure the click is registered
    }

    async apClick(selector: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.waitForExist({ timeout: 50000, interval: 500 });
        await el.click();
    }

    async pwType(selector: string, text: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.pwDrawBorder(selector); // Draw border for debugging
        await this.playwrightPage.fill(selector, text);
        await this.playwrightPage.waitForTimeout(2000); 
    }

    async apType(selector: string, text: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.waitForExist({ timeout: 50000, interval: 500 });
        await el.setValue(text);
    }

    async apSetValue(selector: string, value: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.waitForExist({ timeout: 50000, interval: 500 });
        await el.setValue(value);
    }

    async apPressKeyCode(keyCode: number) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        // @ts-ignore
        await (this.appiumDriver as any).pressKeyCode(keyCode);
    }

    async pwPress(selector: string, key: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.press(selector, key);
    }

    async pwGetText(selector: string): Promise<string> {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        return await this.playwrightPage.textContent(selector) || '';
    }

    async apGetText(selector: string): Promise<string> {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.waitForExist({ timeout: 50000, interval: 500 });
        return await el.getText();
    }

    async pwWaitForSelector(selector: string, timeout = 5000) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.waitForSelector(selector, { timeout });
    }

    async apWaitForExist(selector: string, timeout = 50000) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const el = await this.appiumDriver.$(selector);
            if (await el.isExisting()) return;
            await new Promise(res => setTimeout(res, 500));
        }
        throw new Error(`Element with selector "${selector}" not found after ${timeout}ms`);
    }

    async pwIsVisible(selector: string): Promise<boolean> {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        return await this.playwrightPage.isVisible(selector);
    }

    async apIsDisplayed(selector: string): Promise<boolean> {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        return await el.isDisplayed();
    }

    async pwIsEnabled(selector: string): Promise<boolean> {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        return await this.playwrightPage.isEnabled(selector);
    }

    async apIsEnabled(selector: string): Promise<boolean> {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        return await el.isEnabled();
    }

    async pwIsChecked(selector: string): Promise<boolean> {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        return await this.playwrightPage.isChecked(selector);
    }

    async pwSelectOption(selector: string, value: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.selectOption(selector, value);
    }

    async apIsSelected(selector: string): Promise<boolean> {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        return await el.isSelected();
    }

    async pwHover(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.hover(selector);
    }

    async pwFocus(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.focus(selector);
    }

    async pwBlur(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.locator(selector).blur();
    }

    

    async pwCheck(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.check(selector);
    }

    async pwUncheck(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.uncheck(selector);
    }

    async pwScreenshot(path: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.screenshot({ path });
    }

    async pwGoto(url: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.goto(url);
        await this.playwrightPage.waitForTimeout(5000); 
    }

    // --- Playwright Verifications ---

    async pwVerifyText(selector: string, expected: string): Promise<boolean> {
        const actual = await this.pwGetText(selector);
        return actual.trim() === expected.trim();
    }

    async pwVerifyVisible(selector: string): Promise<boolean> {
        return await this.pwIsVisible(selector);
    }

    async pwVerifyEnabled(selector: string): Promise<boolean> {
        return await this.pwIsEnabled(selector);
    }

    async pwVerifyChecked(selector: string): Promise<boolean> {
        return await this.pwIsChecked(selector);
    }

    // --- Appium Actions ---

    // async apClick(selector: string) {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     await el.waitForExist({ timeout: 50000, interval: 500 });
    //     await el.click();
    // }

    // async apType(selector: string, text: string) {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     await el.waitForExist({ timeout: 50000, interval: 500 });
    //     await el.setValue(text);
    // }

    // async apGetText(selector: string): Promise<string> {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     await el.waitForExist({ timeout: 50000, interval: 500 });
    //     return await el.getText();
    // }

    // async apWaitForExist(selector: string, timeout = 50000) {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const start = Date.now();
    //     while (Date.now() - start < timeout) {
    //         const el = await this.appiumDriver.$(selector);
    //         if (await el.isExisting()) return;
    //         await new Promise(res => setTimeout(res, 500));
    //     }
    //     throw new Error(`Element with selector "${selector}" not found after ${timeout}ms`);
    // }

    // async apIsDisplayed(selector: string): Promise<boolean> {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     return await el.isDisplayed();
    // }

    // async apIsEnabled(selector: string): Promise<boolean> {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     return await el.isEnabled();
    // }

    // async apIsSelected(selector: string): Promise<boolean> {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     return await el.isSelected();
    // }

    async apClear(selector: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.clearValue();
    }

    // async apSetValue(selector: string, value: string) {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const el = await this.appiumDriver.$(selector);
    //     await el.waitForExist({ timeout: 50000, interval: 500 });
    //     await el.setValue(value);
    // }

    // async apPressKeyCode(keyCode: number) {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     // @ts-ignore
    //     await (this.appiumDriver as any).pressKeyCode(keyCode);
    // }

    async apLongPress(selector: string, duration = 1000) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.touchAction([
            { action: 'press', x: 0, y: 0, duration },
            { action: 'release' }
        ] as any);
    }

    async apSwipe(startX: number, startY: number, endX: number, endY: number, duration = 1000) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        // @ts-ignore
        await (this.appiumDriver as any).touchPerform([
            { action: 'press', options: { x: startX, y: startY } },
            { action: 'wait', options: { ms: duration } },
            { action: 'moveTo', options: { x: endX, y: endY } },
            { action: 'release' }
        ]);
    }

    // --- Appium Verifications ---

    async apVerifyText(selector: string, expected: string): Promise<boolean> {
        const actual = await this.apGetText(selector);
        return actual.trim() === expected.trim();
    }

    async apVerifyDisplayed(selector: string): Promise<boolean> {
        return await this.apIsDisplayed(selector);
    }

    async apVerifyEnabled(selector: string): Promise<boolean> {
        return await this.apIsEnabled(selector);
    }

    async apVerifySelected(selector: string): Promise<boolean> {
        return await this.apIsSelected(selector);
    }

    // --- Utility: Draw Border Around Element ---

    async pwDrawBorder(selector: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        // Support both CSS and XPath selectors
        if (selector.startsWith('//') || selector.startsWith('(')) {
            // XPath selector
            const elHandle = await this.playwrightPage.$(selector);
            if (elHandle) {
                await elHandle.evaluate(async (el: HTMLElement) => {
                    el.style.outline = '2px solid green';
                    await new Promise(res => setTimeout(res, 1000));
                    el.style.outline = '';
                });
            }
        } else {
            // CSS selector
            await this.playwrightPage.evaluate(async (sel) => {
                const el = document.querySelector(sel);
                if (el) {
                    (el as HTMLElement).style.outline = '20px solid green';
                    await new Promise(res => setTimeout(res, 1000));
                    (el as HTMLElement).style.outline = '';
                }
            }, selector);
        }
    }

}