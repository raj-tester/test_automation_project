# Test Automation Framework

This is a Playwright-based test automation framework that covers both UI and API testing for the authentication application.

## Framework Structure

```
tests/
├── page-objects/        # Page Object Models
│   ├── LoginPage.js
│   └── SignupPage.js
├── modules/            # Test modules by feature
│   ├── login/         # Login related tests
│   │   ├── ui/        # UI tests
│   │   └── api/       # API tests
│   └── signup/        # Signup related tests
│       ├── ui/        # UI tests
│       └── api/       # API tests
└── utils/             # Utility functions and helpers
    └── api-helpers.js
```

## Features

- Page Object Model design pattern
- Separate UI and API tests
- Allure reporting integration
- GitHub Actions CI/CD integration
- Cross-browser testing support
- Parallel test execution
- Automatic retries in CI
- Screenshot on test failure

## Running Tests

1. Start the application:
   ```bash
   # Start backend
   cd server && npm start
   
   # Start frontend
   cd client && npm start
   ```

2. Run the tests:
   ```bash
   # Run all tests
   npx playwright test
   
   # Run specific test file
   npx playwright test modules/login/ui/login.spec.js
   
   # Run with Allure reporting
   npx playwright test --reporter=allure-playwright
   ```

3. Generate and view Allure report locally:
   ```bash
   allure generate allure-results -o allure-report --clean
   allure open allure-report
   ```

## CI/CD Integration

Tests are automatically run on GitHub Actions when:
- A pull request is created/updated
- Code is merged to main branch

The workflow can be found in `.github/workflows/playwright.yml`

### Viewing Test Reports in CI/CD

#### Allure Reports
After each workflow run, the Allure report is automatically deployed to GitHub Pages and can be accessed at:
```
https://<username>.github.io/<repository-name>/
```

For example, if your GitHub username is "raj-tester" and repository is "test_automation_project", the report will be at:
```
https://raj-tester.github.io/test_automation_project/
```

The report includes:
- Test execution results
- Test steps and screenshots
- Test duration and retries
- Environment details
- Historical trends

#### Playwright Report
In addition to the Allure report, the Playwright HTML report is also available as an artifact in the GitHub Actions workflow run. To view it:

1. Go to the Actions tab in your repository
2. Click on the workflow run
3. Scroll down to "Artifacts"
4. Download and extract "playwright-report" 