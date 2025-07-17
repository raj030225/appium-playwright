import { Browser } from 'webdriverio';
import { BasicKeyword } from '../../base/basic-keyword';

export class HomePage {
    private readonly basic: BasicKeyword;

    constructor(driver: Browser) {
        this.basic = new BasicKeyword(undefined, driver);
    }   
    
    async navigateToMyProfile(selector: string): Promise<void> {
        await this.basic.clickElement(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async navigateToMyDetails(selector: string): Promise<void> {
        await this.basic.clickElement(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async fillPersonalDetails(): Promise<void> {
        const firstNameInput = '//android.widget.ScrollView/android.widget.EditText[1]';
        const lastNameInput = '//android.widget.ScrollView/android.widget.EditText[2]';
        const dobInput = '//android.widget.ScrollView/android.widget.EditText[4]';
        const panInput = '//android.widget.ScrollView/android.widget.EditText[5]';
        const emailInput = '//android.widget.ScrollView/android.widget.EditText[6]';

        await this.basic.clickElement(firstNameInput);
        await this.basic.typeInput(firstNameInput, 'QA');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.clickElement(lastNameInput);
        await this.basic.typeInput(lastNameInput, 'User');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.clickElement(dobInput);
        await this.basic.typeInput(dobInput, '20/12/2020');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.clickElement(panInput);
        await this.basic.typeInput(panInput, 'AOPKE0445J');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.clickElement(emailInput);
        await this.basic.typeInput(emailInput, 'qauser@gmail.com');
        await this.basic.getAppiumDriver()?.pause(5000);
    }
  
    async acceptNotification(selector: string): Promise<void> {
        await this.basic.clickElement(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async enterMPIN(): Promise<void> {
        const txtMPIN1 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_1"]';
        const txtMPIN2 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_2"]';
        const txtMPIN3 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_3"]';
        const txtMPIN4 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_4"]';
        await this.basic.waitForElement(txtMPIN1, 120);
        await this.basic.typeInput(txtMPIN1, '1');
        // await this.basic.getAppiumDriver()?.pause(1000);
        await this.basic.typeInput(txtMPIN2, '2');
        // await this.basic.getAppiumDriver()?.pause(1000);
        await this.basic.typeInput(txtMPIN3, '3');
        // await this.basic.getAppiumDriver()?.pause(1000);
        await this.basic.typeInput(txtMPIN4, '4');
        // await this.basic.getAppiumDriver()?.pause(30000);   
        await this.basic.sleep(20000);    
    } 

    async performSearch(): Promise<void> {
        const txtSearch = '//android.widget.EditText';
        const btnSearch = '//android.widget.EditText/following-sibling::android.view.View/android.widget.Image[2]';
        await this.basic.waitForElement(txtSearch, 120);
        await this.basic.typeInput(txtSearch, 'Car Loan For Used Cars');
        // await this.basic.getAppiumDriver()?.pause(5000);
        await this.basic.clickElement(btnSearch);
        await this.basic.sleep(5000); // Wait for 5 seconds to ensure the search is performed
        // await this.basic.getAppiumDriver()?.pause(30000);
        // await this.basic.switchToWebView();
        // await this.basic.getAppiumDriver()?.pause(10000); // Wait for 10
        await this.basic.clickElement('//android.widget.EditText');
        // await this.basic.getAppiumDriver()?.pause(5000);
        await this.basic.typeInput('//android.widget.EditText', 'Car Loan For Used Cars');
        // await this.basic.getAppiumDriver()?.pause(5000);
        await this.basic.clickElement('//android.widget.TextView[@text="Car Loan For Used Cars"]');
        await this.basic.sleep(10000); // Wait for 5 seconds to ensure the search is performed
        // await this.basic.getAppiumDriver()?.pause(15000);
        
    }

    async navigateToHomeLoanPage(): Promise<void> {
        const lnkHomeLoan = '//android.widget.TextView[@text="Home Loan"]';

        // await this.basic.sleep(10000); 
        await this.basic.scroll(lnkHomeLoan, 'up', 0.60);
        await this.basic.clickElement(lnkHomeLoan);
        await this.basic.sleep(10000);
    }

    async verifyHomeLoanPage(): Promise<void> {
        await this.basic.apVerifyDisplayed('//android.widget.TextView[@text="Home Loan"]');
        await this.basic.apVerifyText('//android.widget.TextView[@text="Home Loan"]', 'Home Loan');
    }

    async selectDifferentEMITerms(): Promise<void> {
        await this.basic.clickElement('//android.widget.TextView[@text="5"]');
        await this.basic.clickElement('//android.widget.TextView[@text="10"]');
        await this.basic.clickElement('//android.widget.TextView[@text="15"]');
        await this.basic.sleep(10000);
    }


    async navigateToHomePage(): Promise<void> {
        await this.basic.clickElement('//android.view.View[@text="Home"]');
        await this.basic.sleep(10000);
        // await this.basic.getAppiumDriver()?.pause(10000);
    }

    async continueforMobileValidation(): Promise<void> {
        const btnContinue = '//android.widget.Button';
        await this.basic.clickElement(btnContinue);
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 1 second to ensure the click is registered
    }

    async continueWithOTPValidation(selector: string): Promise<void> {
        await this.basic.clickElement(selector);
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 1 second to ensure the click is registered
    }

    async enterMobileNumber(selector: string): Promise<void> {
        await this.basic.typeInput(selector, '9289479292'); // Enter a sample mobile number
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 1 second to ensure the click is registered
    }

    async getOTP(selector: string): Promise<void> {
        await this.basic.clickElement(selector);
        await this.basic.getAppiumDriver()?.pause(10000); // Wait for 10 seconds to ensure the click is registered
    }
}



