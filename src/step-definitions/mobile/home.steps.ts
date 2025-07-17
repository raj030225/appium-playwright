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
    console.log('*************** Session ID ****************');
    console.log(await MobileDriver.getDriver().sessionId);
    console.log('******************************************');
});

Then('I continue with providing MPIN', { timeout: 300000 }, async function () {
    await homePage.enterMPIN(); 
});

Then('I perform the search for car loan', { timeout: 300000 }, async function () {
    await homePage.performSearch();   
});

Then('I navigate back to Home Page', { timeout: 300000 }, async function () {
    await homePage.navigateToHomePage();   
});

Then('I navigate to Home Loan Page', { timeout: 300000 }, async function () {
    await homePage.navigateToHomeLoanPage();
});

Then('I verify user is on Home Loan Page', { timeout: 300000 }, async function () {
    await homePage.verifyHomeLoanPage();
});

Then('I select different EMI Term options on Home Loan Page', { timeout: 300000 }, async function () {
    await homePage.selectDifferentEMITerms();
});


