import { Browser } from 'webdriverio';
import { BasicKeyword } from '../../base/basic-keyword';

export class HomePage {
    private readonly basic: BasicKeyword;

    constructor(driver: Browser) {
        this.basic = new BasicKeyword(undefined, driver);
    }   
    
    async navigateToMyProfile(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async navigateToMyDetails(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async stratumtest(): Promise<void> {
        await this.basic.apClick("//android.view.ViewGroup[@content-desc='PODIUM LOGIN Button']");
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
        await this.basic.apSetValue('//android.view.ViewGroup[@content-desc="Username Text Field"]/android.view.ViewGroup/android.widget.EditText', 'JyotsnaThukral');
        await this.basic.getAppiumDriver()?.pause(2000); 
        await this.basic.apSetValue('//android.view.ViewGroup[@content-desc="Password Text Field"]/android.view.ViewGroup/android.widget.EditText', '&0sGG40*$^l&793I');
        await this.basic.getAppiumDriver()?.pause(2000); 
        await this.basic.apClick("//android.widget.TextView[@text='LOGIN']");
        await this.basic.getAppiumDriver()?.pause(30000); 

        // await this.basic.switchToWebView();
        // await this.basic.getAppiumDriver()?.pause(5000);

        await this.basic.apClick('(//android.view.View/android.widget.Button)[1]');
        await this.basic.getAppiumDriver()?.pause(5000); 

        await this.basic.apClick('(//android.view.View/android.widget.Button)[2]');
        await this.basic.getAppiumDriver()?.pause(5000); 

        await this.basic.apClick('(//android.view.View/android.widget.Button)[3]');
        await this.basic.getAppiumDriver()?.pause(5000); 

        // await this.basic.apClick('//android.widget.Button[@text="Global Overlays menu"]');
        // await this.basic.getAppiumDriver()?.pause(5000); 

        // await this.basic.apClick('//android.widget.TextView[@text="ALERTS"]');
        // await this.basic.getAppiumDriver()?.pause(5000); 

        // await this.basic.apClick('//android.widget.TextView[@text="CHART"]');
        // await this.basic.getAppiumDriver()?.pause(5000); 

    }


    async fillPersonalDetails(): Promise<void> {
        const firstNameInput = '//android.widget.ScrollView/android.widget.EditText[1]';
        const lastNameInput = '//android.widget.ScrollView/android.widget.EditText[2]';
        const dobInput = '//android.widget.ScrollView/android.widget.EditText[4]';
        const panInput = '//android.widget.ScrollView/android.widget.EditText[5]';
        const emailInput = '//android.widget.ScrollView/android.widget.EditText[6]';

        await this.basic.apClick(firstNameInput);
        await this.basic.apSetValue(firstNameInput, 'QA');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.apClick(lastNameInput);
        await this.basic.apSetValue(lastNameInput, 'User');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.apClick(dobInput);
        await this.basic.apSetValue(dobInput, '20/12/2020');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.apClick(panInput);
        await this.basic.apSetValue(panInput, 'AOPKE0445J');
        await this.basic.getAppiumDriver()?.pause(1000);

        await this.basic.apClick(emailInput);
        await this.basic.apSetValue(emailInput, 'qauser@gmail.com');
        await this.basic.getAppiumDriver()?.pause(5000);
    }
  
    async acceptNotification(selector: string): Promise<void> {
        await this.basic.apClick(selector);
        await this.basic.getAppiumDriver()?.pause(5000); // Wait for 1 second to ensure the click is registered
    }

    async enterMPIN(): Promise<void> {
        const txtMPIN1 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_1"]';
        const txtMPIN2 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_2"]';
        const txtMPIN3 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_3"]';
        const txtMPIN4 = '//android.widget.EditText[@resource-id="org.altruist.BajajExperia:id/edt_digit_4"]';
        await this.basic.apSetValue(txtMPIN1, '1');
        await this.basic.getAppiumDriver()?.pause(2000);
        await this.basic.apSetValue(txtMPIN2, '2');
        await this.basic.getAppiumDriver()?.pause(2000);
        await this.basic.apSetValue(txtMPIN3, '3');
        await this.basic.getAppiumDriver()?.pause(2000);
        await this.basic.apSetValue(txtMPIN4, '4');
        await this.basic.getAppiumDriver()?.pause(30000); // Wait for 1 second to ensure the click is registered
    }

    async performSearch(): Promise<void> {
        const txtSearch = '//android.widget.EditText';
        const btnSearch = '//android.widget.EditText/following-sibling::android.view.View/android.widget.Image[2]';
        await this.basic.apSetValue(txtSearch, 'Car Loan For Used Cars');
        await this.basic.getAppiumDriver()?.pause(5000);
        await this.basic.apClick(btnSearch);
        await this.basic.getAppiumDriver()?.pause(30000);
        // await this.basic.switchToWebView();
        // await this.basic.getAppiumDriver()?.pause(10000); // Wait for 10
        await this.basic.apClick('//android.widget.EditText');
        await this.basic.getAppiumDriver()?.pause(3000);
        await this.basic.apSetValue('//android.widget.EditText', 'Car Loan For Used Cars');
        await this.basic.getAppiumDriver()?.pause(9000);
        await this.basic.apClick('//android.widget.TextView[@text="Car Loan For Used Cars"]');
        await this.basic.getAppiumDriver()?.pause(9000);
    }

    async continueforMobileValidation(): Promise<void> {
        const btnContinue = '//android.widget.Button';
        await this.basic.apClick(btnContinue);
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

