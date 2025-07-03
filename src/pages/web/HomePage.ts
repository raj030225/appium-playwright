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
        await this.basic.pwType('//div[@class="form-group"]/input', searchTerm);
        await this.basic.pwClick('//i[@class="bf-icon-search"]');
    }

    async sortResult() {
        await this.basic.pwWaitForSelector('body');
        await this.basic.pwClick('//span[@class="sort-by-txt"]');
        await this.basic.pwClick('//div[@class="sortby-panel-list-main"]/span[2]');
    }
}


