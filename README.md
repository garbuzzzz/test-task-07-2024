# Setup instructions
install dependencies:           npm i
run tests:                      npm test
run tests in headed mode:       npm run debug


# Autologin
The very first test case is supposed to login to the env and store login cookies into the file: ./autologinState.json.
Each subsequent test case will open up the env without having to log in.
For debugging purposes locally, autologin can be disabled once logged it. To do so, comment out the 'autologin' project in the playwright.config.ts as well as the the 'ui-tests' dependency on the 'autologin' project.

# API support

Goal:
- Create a structured way to prepare test data via Salesforce REST API and interact with it/

API support starts with controllers:

Controllers are responsible for making requests to the particular API's endpoints with the power of Playwright's [APIRequestContext](https://playwright.dev/docs/api/class-apirequestcontext)

More info about API testing capabilities of Playwright [here](https://playwright.dev/docs/test-api-testing)

Hierarchy Example:

```
                <abstract class>
                   Controller
                       ^
                       |
            __________/ \___________
           /                        \
       <class>                      <class>
  SalesForceAPI controller              AWS API controller (not included in this framework)
```

The controller is supposed to provide making CRUD operations with the SalesForce database. It is used by the SalesforceClient that operates with particular tasks more high-level

# Components

Components are groups of DOM nodes, with a consistent DOM hierarchy, that can be a part of the page or tab and spawn multiple times across the app.

For example SalesForce Lightning Components.

For such elements we want to have objects which would provide us with interfaces to interact with those DOM node groups as one entity.

For example, the ToastMessage component is located at ./src/pages/components/ToastMessage.ts.

More information about it [here] (https://developer.salesforce.com/docs/platform/lwc/guide/use-toast.html)

# Fixtures
Test fixtures are used to establish environment for each test, giving the test everything it needs and nothing else.

The file with the fixture is located here: './src/support/fixtures/fixture.ts'

At the fixture level, we authorize SalesForceAPI Client to make it work for each test case.

# Global setup
It can be used to execute some code once during the runtime. It also can be used to establish global variables that are not supposed to change during the runtime. In this example, it defines the sales app id.

The file is located here: './src/global/fixtures/global.setup.ts'

# Pages
PageObject pattern is used to separate business level steps from code level action for each particular page. Pages can be found at './src/pages/'

# DataFactoryStorage
DataFactoryStorage is used to store predefined data that can be used throughout the runtime. If it become more complicated, can be used along with the Factory pattern to provide the more flexible way of storing data.

The DataFactoryStorage file is located here: './src/support/DataFactoryStorage.ts'






