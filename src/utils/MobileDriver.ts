import { remote } from 'webdriverio';

export class MobileDriver {
    
    private static driver: WebdriverIO.Browser;    
    
    static async init() {
        const maxRetries = 3;
        let lastError;

        for (let i = 0; i < maxRetries; i++) {
            try {
                this.driver = await remote({
                    protocol: 'http',
                    hostname: 'localhost',
                    port: 4723,
                    path: '/',
                    logLevel: 'debug',
                    waitforTimeout: 300000,
                    connectionRetryCount: 3,
                    connectionRetryTimeout: 300000,
                    capabilities: {
                        platformName: "Android",
                        'appium:browserName': "",
                        'appium:automationName': "UiAutomator2",
                        // 'appium:deviceName': "adb-2B301FDH200HJS-InF8Pa._adb-tls-connect._tcp",
                        'appium:deviceName': "emulator-5554",
                        'appium:appPackage': "org.altruist.BajajExperia",
                        'appium:appActivity': "com.bfl.superapp.onboarding.revamp.activity.SplashActivity",

                        // 'appium:deviceName': "emulator-5554",
                        // 'appium:appPackage': "com.stratumfive_mobileapp",
                        // 'appium:appActivity': "com.stratumfive_mobileapp/.MainActivity",

                        'appium:noReset': true,
                        'appium:newCommandTimeout': 120,
                        'appium:androidDeviceReadyTimeout': 60,
                        'appium:adbExecTimeout': 120000,
                        'appium:autoGrantPermissions': true,
                        'appium:autoWebview': false,
                        'appium:chromedriverExecutable': "C:/chromedrivers/124/chrome/chrome.exe",
                        'appium:androidDeviceSocket': "chrome_devtools_remote"

                    }
                });
                // If we get here, the connection was successful
                return;
            } catch (error) {
                lastError = error;
                console.log(`Attempt ${i + 1} failed, retrying...`);
                // Wait for 5 seconds before retrying
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
        
        throw new Error(`Failed to initialize driver after ${maxRetries} attempts. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
    }

    static getDriver(): WebdriverIO.Browser {
        return this.driver;
    }    
    
    static async close() {
        if (this.driver) {
            try {
                await this.driver.deleteSession();
            } catch (error: any) {
                console.error('Error closing session:', error.message);
            }
        }
    }
}
