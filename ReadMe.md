Now let's install all the required dependencies:

Great! I've created a complete automation framework that supports both web and mobile testing. Here's what I've set up:

Project Structure:
playwright-appium-bdd-ts-framework/
├── src/
│   ├── features/
│   │   ├── web/
│   │   │   └── login.feature
│   │   └── mobile/
│   │       └── calculator.feature
│   ├── pages/
│   │   ├── web/
│   │   │   └── LoginPage.ts
│   │   └── mobile/
│   │       └── CalculatorPage.ts
│   ├── step-definitions/
│   │   ├── web/
│   │   │   └── login.steps.ts
│   │   └── mobile/
│   │       └── calculator.steps.ts
│   └── utils/
│       ├── WebDriver.ts
│       └── MobileDriver.ts
├── package.json
├── tsconfig.json
└── cucumber.js


# Allure Reporting Integration

This project is configured to generate Allure reports for your Cucumber tests.

## How to Generate Allure Reports

1. **Run your tests** as usual. After execution, Allure results will be saved in the `allure-results` directory.

2. **Generate the Allure HTML report**:

   ```powershell
   npx allure-commandline generate allure-results --clean -o allure-report
   ```

3. **Open the Allure report** in your browser:

   ```powershell
   npx allure-commandline open allure-report
   ```

## Notes
- The Allure results are automatically cleaned before each run.
- You can add these commands as npm scripts for convenience.

---
For more details, see the [Allure documentation](https://docs.qameta.io/allure/).


Features:
Web: A sample feature
Mobile: A sample feature
To run the tests:
For web tests: npm run test:web
For mobile tests: npm run test:mobile
For the mobile tests to work, you'll need:

Appium server running (appium in a separate terminal)
An Android emulator or real device connected
A calculator app (the path should be set in the MOBILE_APP_PATH environment variable)
You can run web tests right away as they use a sample website (example.com).

The framework uses:

TypeScript for type safety
Playwright for web automation
Appium with WebdriverIO for mobile automation
Cucumber for BDD-style testing
Page Object Model pattern for better maintainability