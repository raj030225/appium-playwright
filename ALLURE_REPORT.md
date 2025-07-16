# Allure Reporting: Capturing Detailed Steps

This project is configured to generate Allure reports for your Cucumber tests, including detailed step information.

## How to Capture Detailed Steps in Allure Reports

Allure will automatically capture each Cucumber step as a test step. To further enhance your reports with custom steps, attachments, and metadata, use the Allure API in your step definitions:

### Example: Adding Custom Steps and Attachments

```typescript
import { When } from '@cucumber/cucumber';
import * as allure from 'allure-js-commons';

When('I perform a custom action', async function () {
  await allure.step('Open the login page', async () => {
    // your code here
  });
  await allure.step('Fill in credentials', async () => {
    // your code here
    await allure.attachment('Login Data', JSON.stringify({user: 'test'}), { contentType: 'application/json' });
  });
});
```

- Each `allure.step` will appear as a nested step in the report.
- Use `allure.attachment` to add screenshots, logs, or data.
- You can also use `allure.label`, `allure.parameter`, and other API methods for richer context.

## Generating and Viewing the Report

1. **Run your tests** as usual. Allure results will be saved in the `allure-results` directory.
2. **Generate the HTML report:**
   ```powershell
   npm run allure:generate
   ```
3. **Open the report:**
   ```powershell
   npm run allure:open
   ```

## References
- [Allure CucumberJS Docs](https://allurereport.org/docs/cucumberjs/)
- [Allure API Reference](https://allurereport.org/docs/cucumberjs-reference/)

---
For best results, add custom steps and attachments in your step definitions as shown above.
