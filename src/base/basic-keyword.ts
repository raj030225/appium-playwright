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
        return { browser, context, page };
    }

    async setPlaywright(page: Page, context?: BrowserContext, browser?: Browser) {
        this.playwrightPage = page;
        if (context) this.playwrightContext = context;
        if (browser) this.playwrightBrowser = browser;
    }

    async pwGoto(url: string) {
        if (!this.playwrightPage) throw new Error('Playwright page not initialized');
        await this.playwrightPage.goto(url);
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
    async sleep(ms: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, ms));
    }

    async waitForElement(selector: string, iteration:number) {
        if (this.playwrightPage !== undefined) {
            for( let i = 0; i < iteration; i++) {
                if(await this.playwrightPage.isVisible(selector) === true) {   
                    break;
                }
                else{
                    await this.playwrightPage.waitForTimeout(500);
                }
            }
        }

        if (this.appiumDriver !== undefined) {
            for( let i = 0; i < 100; i++) {
                if(await this.appiumDriver.$(selector).isDisplayed() === true) {   
                    break;
                }
                else{
                    await this.appiumDriver.pause(500);
                }
            }
        }
    }

    async clickElement(selector: string) {
        if (this.playwrightPage !== undefined) {
            await this.waitForElement(selector, 60);
            await this.pwDrawBorder(selector); 
            await this.playwrightPage.click(selector);
            await this.playwrightPage.waitForTimeout(2000);
        }

        if (this.appiumDriver !== undefined) {
            await this.waitForElement(selector, 60);
            const el = await this.appiumDriver.$(selector).click();
        }
    }

    async setValue(selector: string, value: string)  {
        if (this.playwrightPage !== undefined) {
            await this.waitForElement(selector, 60);
            await this.pwDrawBorder(selector);
            await this.playwrightPage.fill(selector, value);
        }

        if (this.appiumDriver !== undefined) {
            await this.waitForElement(selector, 60);
            const el = await this.appiumDriver.$(selector);
            await el.setValue(value);
            await this.appiumDriver.hideKeyboard();
        }
    }

    async typeInput(selector: string, value: string)  {
        if (this.playwrightPage !== undefined) {
            await this.waitForElement(selector, 60);
            await this.pwDrawBorder(selector);
            await this.playwrightPage.fill(selector, value);
        }

        if (this.appiumDriver !== undefined) {
            await this.waitForElement(selector, 60);
            const el = await this.appiumDriver.$(selector);
            await el.setValue(value);
        }
    }

    async scroll(selector: string, direct: string, value: number) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const windowRect = await this.appiumDriver.getWindowRect();
        // const startX = windowRect.width / 2;
        // const startY = windowRect.height * 0.8;
        // const endY = windowRect.height * 0.2;

        for( let i = 0; i < 10; i++) {
            if(await this.appiumDriver.$(selector).isDisplayed() === true) {   
                break;
            }
            else {
                await this.appiumDriver.execute('mobile: swipeGesture', {
                    left: windowRect.width * 0.25,
                    top: windowRect.height * 0.25,
                    width: windowRect.width * 0.80,
                    height: windowRect.height * 0.60,
                    direction: direct,
                    percent: value, // e.g., 0.7
                    });

                // await this.appiumDriver.touchPerform([
                //     { action: 'press', options: { x: startX, y: startY } },
                //     { action: 'wait', options: { ms: 1000 } },
                //     { action: 'moveTo', options: { x: startX, y: direct === 'up' ? endY : startY } },
                //     { action: 'release' }
                // ]);
                await this.appiumDriver.pause(5000);
            }
        }
    }


    async apPressKey(value: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        // @ts-ignore
        await (this.appiumDriver as any).execute('mobile: shell', {
        command: 'input',
        args: ['text', value],
        });
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

    async typeLikeHumanBySelector(selector: string, text: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const element = await this.appiumDriver.$(selector);  // Get the element using the selector
        for (const char of text) {
            await element.addValue(char);     // Type each character
            await new Promise(res => setTimeout(res, 10));  // Delay between characters
        }
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


    async apClear(selector: string) {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        const el = await this.appiumDriver.$(selector);
        await el.clearValue();
    }

    // switchContext.ts
    // async switchToWebViewContext() {
    //     if (!this.appiumDriver) throw new Error('Appium driver not initialized');
    //     const currentContext = await this.appiumDriver.getContext();
    //     console.log(`Current Context: ${currentContext}`);
    //     // Get all available contexts
    //     const contexts = await this.appiumDriver.getContexts();
    //     // Find the WebView context
    //     const webviewContext = (contexts as any[]).map(ctx => typeof ctx === 'string' ? ctx : (ctx.id || '')).find((ctx: string) => ctx.includes('WEBVIEW'));
    //     if (!webviewContext) {
    //         throw new Error('No WebView context found');
    //     }

    //     // Switch to WebView
    //     await this.appiumDriver.switchContext(webviewContext);
    //     console.log(`Switched to context: ${webviewContext}`);
    // }


    async switchToWebView() {
        if (!this.appiumDriver) throw new Error('Appium driver not initialized');
        try {
            // Get current context
            const currentContext = await this.appiumDriver.getContext();
            console.log("**************************** Current Context ****************************************");
            console.log(`Current Context: ${currentContext}`);
            console.log("*************************************************************************************");

            let contexts: string[] = [];
            let webviewContext: string | undefined;

            // Retry loop to wait for WebView context to appear
            for (let i = 0; i < 10; i++) {
                const rawContexts = await this.appiumDriver.getContexts();
                // Normalize to string[]
                if (Array.isArray(rawContexts)) {
                    contexts = rawContexts.map(ctx => typeof ctx === 'string' ? ctx : (ctx.id || ''));
                } else if (typeof rawContexts === 'object' && rawContexts !== null && 'contexts' in rawContexts) {
                    // AppiumDetailedCrossPlatformContexts
                    // @ts-ignore
                    contexts = (rawContexts.contexts as any[]).map(ctx => typeof ctx === 'string' ? ctx : (ctx.id || ''));
                } else {
                    contexts = [];
                }
                console.log(`Available Contexts: ${contexts.join(', ')}`);

                webviewContext = contexts.find(ctx => ctx.includes('WEBVIEW'));
                if (webviewContext) {
                    console.log("**************************** First Webview Context Found ****************************************");
                    console.log(`First Webview Context: ${webviewContext}`);
                    console.log("*************************************************************************************");
                    break;
                }

                await this.appiumDriver.pause(1000); // wait 1 second
            }

            if (!webviewContext) {
                throw new Error("WEBVIEW context not found.");
            }

            console.log("****************************** Switching to Webview Context ****************************************");
            console.log(`Switching to: ${webviewContext}`);
            console.log("*************************************************************************************");
            await this.appiumDriver.switchContext(webviewContext);
        } catch (error) {
            console.error(`Error while switching context: ${(error as Error).message}`);
            throw error;
        }
    }

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