import { Page } from '@playwright/test';
import { BasicKeyword } from '../../base/basic-keyword';

export class HomePage {
    private readonly basic: BasicKeyword;

    constructor(page: Page) {
        this.basic = new BasicKeyword(page);
    }

    async navigate() {
        await this.basic.pwGoto('https://www.bajajfinserv.in/');
        await this.basic.pwWaitForSelector('body');
    }

    async performSearch(searchTerm: string) {
        await this.basic.typeInput('//div[@class="form-group"]/input', searchTerm);
        await this.basic.clickElement('//i[@class="bf-icon-search"]');
    }

    async sortResult() {
        await this.basic.pwWaitForSelector('body');
        await this.basic.clickElement('//span[@class="sort-by-txt"]');
        await this.basic.clickElement('//div[@class="sortby-panel-list-main"]/span[2]');
    }
}


