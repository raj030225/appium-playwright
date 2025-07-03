import { Browser } from 'webdriverio';
import { BasicKeyword } from '../../base/basic-keyword';

export class HomePage {
    private readonly basic: BasicKeyword;

    constructor(driver: Browser) {
        this.basic = new BasicKeyword(undefined, driver);
    }    
  
    async acceptNotification(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async continueforMobileValidation(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 1 second to ensure the click is registered
    }

    async continueWithOTPValidation(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 1 second to ensure the click is registered
    }

    async enterMobileNumber(selector: string): Promise<void> {
        await this.basic.apSetValue(selector, '9289479292'); // Enter a sample mobile number
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 1 second to ensure the click is registered
    }

    async getOTP(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 10 seconds to ensure the click is registered
    }
}

