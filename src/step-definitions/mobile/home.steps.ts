import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { MobileDriver } from '../../utils/MobileDriver';
import { HomePage } from '../../pages/mobile/HomePage';

let homePage: HomePage;

Before({ tags: "@mobile", timeout: 300000 }, async function () {
    console.log('Starting mobile test setup...');
    try {
        console.log('Initializing mobile driver...');
        await MobileDriver.init();
        console.log('Mobile driver initialized successfully');
        homePage = new HomePage(MobileDriver.getDriver());
        console.log('Home page object created successfully');
    } catch (error) {
        console.error('Error in Before hook:', error);
        throw error;
    }
});

After({ tags: "@mobile" }, async function () {
    await MobileDriver.close();
});

Given('I launch the Bajaj app', { timeout: 300000 }, async function () {
    console.log('Launching Bajaj app...');
});



Then('I accept to send notification', { timeout: 300000 }, async function () {
    await homePage.continueforMobileValidation('//android.widget.Button[@resource-id="org.altruist.BajajExperia:id/btnContinue"]');
    await homePage.continueWithOTPValidation('//android.widget.Button[@resource-id="org.altruist.BajajExperia:id/continueWithOtpBtn"]');
    await homePage.enterMobileNumber('//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/mobile_number"]');
    await homePage.getOTP('//android.widget.Button[@resource-id="org.altruist.BajajExperia:id/btnGetOTP"]');
});

