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
                    waitforTimeout: 120000,
                    connectionRetryCount: 3,
                    connectionRetryTimeout: 120000,
                    capabilities: {
                        platformName: "Android",
                        'appium:browserName': "",
                        'appium:automationName': "UiAutomator2",
                        'appium:deviceName': "emulator-5554",
                        'appium:appPackage': "org.altruist.BajajExperia",
                        'appium:appActivity': "com.bfl.superapp.onboarding.revamp.activity.SplashActivity",
                        'appium:noReset': true,
                        'appium:newCommandTimeout': 240,
                        'appium:androidDeviceReadyTimeout': 120,
                        'appium:adbExecTimeout': 120000,
                        'appium:autoGrantPermissions': true,
                        'appium:autoWebview': false,
                        'appium:chromedriverExecutable': "C:/chromedrivers/124/chrome/chrome.exe",
                        'appium:androidDeviceSocket': "chrome_devtools_remote"

                    }
                });
                // If we get here, the connection was successful
                if (this.driver && this.driver.startRecordingScreen) {
                    await this.driver.startRecordingScreen();
                }
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
                if (this.driver.stopRecordingScreen) {
                    const video = await this.driver.stopRecordingScreen();
                    // Save video to file (base64)
                    const fs = require('fs');
                    const path = require('path');
                    const videoPath = path.join(process.cwd(), 'videos', `mobile_${Date.now()}.mp4`);
                    fs.mkdirSync(path.dirname(videoPath), { recursive: true });
                    fs.writeFileSync(videoPath, Buffer.from(video, 'base64'));
                }
                await this.driver.deleteSession();
            } catch (error: any) {
                console.error('Error closing session:', error.message);
            }
        }
    }
}
