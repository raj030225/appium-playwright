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

// After({ tags: "@mobile" }, async function () {
//     await MobileDriver.close();
// });

Given('I launch the Bajaj app', { timeout: 300000 }, async function () {
    console.log('Launching Bajaj app...');
    console.log('*************** Session ID ****************');
    console.log(await MobileDriver.getDriver().sessionId);
    console.log('******************************************');
});

Then('I perform poc test', { timeout: 300000 }, async function () {
    await homePage.stratumtest();

});

Then('I navigate to my profile page', { timeout: 300000 }, async function () {
    console.log('Accept notification...');
    
    await homePage.navigateToMyProfile('//android.widget.TextView[@text="My Profile"]');
    await homePage.navigateToMyDetails('//android.widget.TextView[@text="My Details"]');
    await homePage.fillPersonalDetails();

});

Then('I continue with providing MPIN', { timeout: 300000 }, async function () {
    console.log('*************** Session ID ****************');
    console.log(await MobileDriver.getDriver().sessionId);
    console.log('******************************************');
    await homePage.enterMPIN(); 
});

Then('I perform the search for car loan', { timeout: 300000 }, async function () {
    console.log('*************** Session ID ****************');
    console.log(await MobileDriver.getDriver().sessionId);
    console.log('******************************************');
    await homePage.performSearch();   
});



