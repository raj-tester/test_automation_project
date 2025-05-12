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

3. Generate Allure report:
   ```bash
   allure generate allure-results -o allure-report --clean
   allure open allure-report
   ```

## CI/CD Integration

Tests are automatically run on GitHub Actions when:
- A pull request is created/updated
- Code is merged to main branch

The workflow can be found in `.github/workflows/playwright.yml` 