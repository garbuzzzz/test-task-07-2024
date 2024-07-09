## Description
This project is a simple framework for the given UI and API test task, built using [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/).

This project is a simplified version of a more complex boilerplate project designed for more complex test task. The more advanced boilerplate project provides a comprehensive foundation for building test automation frameworks. You can explore it [here](https://github.com/garbuzzzz/salesforce-test-task).


# Setup instructions
install dependencies:           npm i
run tests:                      npm test
run tests in headed mode:       npm run debug


# Project Structure
- `src/`: Contains the source code for tests and helper modules.
  - `test/`: Directory with test scenarios.
    - `test-task-ui.spec.ts`: Contains UI test scripts.
    - `test-task-api.spec.ts`: Contains API test scripts.
  - `pages/`: Page Object pattern implementation for representing UI pages.
  - `utils/`: helpers and controllers for API.
  - `types/`: types for Typescript.
- `playwright.config.ts`: Playwright configuration file.
- `tsconfig.json`: TypeScript configuration file.
- `package.json`: Project dependencies and scripts for execution.
- `html-report/`: Contains an html report for executed test cases


## Test Reports
After running the tests, detailed test reports are generated and stored in the `html-report` directory. These reports provide a comprehensive overview of the test execution, including:

- Test execution summary
- Individual test case results
- Video, traces and error messages for failed tests
- Detailed logs and traces for in-depth analysis

To view the test reports, simply open the `index.html` file located in the `html-report` directory in your preferred web browser. The visually appealing and informative reports make it easy to understand the test outcomes and diagnose any issues.
