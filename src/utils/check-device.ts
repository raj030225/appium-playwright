import { remote } from 'webdriverio';

async function checkDeviceConnection() {    try {
        const driver = await remote({
            protocol: 'http',
            hostname: 'localhost',
            port: 4723,
            path: '/',
            logLevel: 'info',
            capabilities: {
                platformName: "Android",
                'appium:automationName': "UiAutomator2",
                'appium:deviceName': "emulator-5554",
                'appium:noReset': true
            }
        });

        console.log('Successfully connected to the device!');
        await driver.deleteSession();    } catch (error: any) {
        console.error('Error connecting to device:', error.message);
    }
}

checkDeviceConnection();
