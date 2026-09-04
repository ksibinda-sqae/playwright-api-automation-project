# Playwright API Automation Project

A Playwright and TypeScript test project for validating API workflows against DummyJSON. This README documents the API projecj

## Scope

The project currently includes authentication scenarios and the reusable framework layers needed to add user and other API workflows:

- Playwright API tests under `tests/api/`
- Typed clients, services, request and response models, data factories, assertions, and fixtures
- Environment-aware configuration using `TEST_ENV`, `.env.<environment>` files, and `application.properties`
- Playwright HTML reporting and Allure reporting with request, response, and status attachments
- Shared logging and framework error handling

## Prerequisites

- Node.js with npm
- Access to the configured API base URL
- Local environment credentials for authenticated scenarios

## Setup

Install dependencies from this directory:

```bash
npm install
```

Create the selected environment file at `config/environment/.env.dev` (and `.env.qa` when QA execution is required). Each file must provide:

```dotenv
API_AUTHENTICATED_USERNAME=<username>
API_AUTHENTICATED_USER_PASSWORD=<password>
```

The non-secret base URL is configured in `config/environment/application.properties`:

```properties
API_BASE_URL=https://dummyjson.com
```

Do not commit `.env.*` files containing credentials, tokens, or other secrets.

## Running tests

Run all API tests:

```bash
npm test
```

Run the API-tagged suite in the development environment. This also cleans old Allure results and generates a report:

```bash
npm run test:api
```

Run against a selected environment:

```bash
npm run test:dev
npm run test:qa
```

Run named suites by tag:

```bash
npm run test:auth
npm run test:smoke
npm run test:func
npm run test:reg
```

Run one file or scenario directly:

```bash
npx playwright test tests/api/auth/authentication.spec.ts --config=playwright.api.config.ts
npx playwright test --config=playwright.api.config.ts --grep "TC01"
```

Debug interactively with:

```bash
npm run test:debug
```

## Reports and logs

Playwright writes its HTML report to `playwright-report/`. Allure results are written to `reports/allure-results/` and the generated static report to `reports/allure-report/`.

```bash
npm run report:allure     # Serve current results locally
npm run report:generate   # Generate the static report
npm run report:open       # Open the generated report
npm run clean:reports     # Remove Allure result and report directories
```

CI retries failed tests up to two times, uses two workers, and captures a trace on the first retry. Local runs do not retry by default.

## Project structure

```text
.
├── assertions/           # Domain-specific verification helpers
├── clients/              # Shared HTTP transport and response normalization
├── data/                 # Constants and test-data factories
├── fixtures/             # Typed Playwright API fixtures
├── models/               # Request, response, and common API types
├── services/             # Endpoint-oriented API workflows
├── config/               # Environment and property loading
├── core/                 # Errors, logging, and reporting helpers
├── docs/                 # How-to guides and test-case catalog
├── tests/api/            # API Playwright specs
├── playwright.api.config.ts
├── playwright.base.config.ts
├── package.json
└── README.md
```

## Adding a new API workflow

1. Define typed request and response models.
2. Add stable data to a factory or constants module when needed.
3. Add the endpoint operation to the relevant service.
4. Add reusable domain assertions.
5. Register reusable services and assertions in `fixtures/apiFixtures.ts`.
6. Add a focused, independently runnable spec under `tests/api/`.
7. Apply `@api` and relevant domain or suite tags.
8. Update the test-case catalog and run the focused test followed by the relevant suite.

Tests should use fixture-provided services, remain safe for parallel execution, and keep transport details out of the spec. See the architecture and convention guides for the boundaries in detail.

## Documentation

- [API documentation index](docs/README.md)
- [How-to guides](docs/how-to/README.md)
- [Architecture overview](docs/how-to/architecture-overview.md)
- [Framework conventions](docs/how-to/framwork-conventions.md)
- [Testing conventions](docs/how-to/testing-conventions.md)
- [API test-case catalog](docs/test-cases/api-suit.md)
