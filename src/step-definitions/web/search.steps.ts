import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { WebDriver } from '../../utils/WebDriver';
import { BasicKeyword } from '../../base/basic-keyword';
import { HomePage } from '../../pages/web/HomePage';

let basic: BasicKeyword;
let homePage: HomePage;

Before({ tags: "@web" }, async function () {
    await WebDriver.init();
    basic = new BasicKeyword(WebDriver.getPage());
    homePage = new HomePage(WebDriver.getPage());
});

After({ tags: "@web" }, async function () {
    await WebDriver.close();
});

Given('I am on the home page', { timeout: 60 * 1000 }, async function () {
    await basic.pwGoto('https://www.bajajfinserv.in/');
    await basic.pwWaitForSelector('body');
});

When('I perform search for {string}', { timeout: 60 * 1000 }, async function (searchTerm: string) {
    await homePage.performSearch(searchTerm);
});

Then('I sort the displayed result from Low to High', { timeout: 60 * 1000 }, async function () {
    await homePage.sortResult();
});

