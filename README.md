# Playwright API Automation Project

A standalone Playwright and TypeScript project for validating DummyJSON API flows.

## What this project includes

- API automation for authentication and service-level validation
- API clients, services, models, data, assertions, and fixtures
- Allure reporting with GitHub Actions integration and GitHub Pages publishing

## Quick start

```bash
npm install
npm run test:api
```

Run the complete API suite without the tag filter:

```bash
npm test
```

Generate or open the Allure report:

```bash
npm run report:generate
npm run report:open
```

## Project structure

```text
.
├── api/                           # Clients, services, models, data, assertions, and fixtures
├── config/                        # API environment and property loading
├── core/                          # Errors, logging, and reporting
├── docs/                          # API documentation and test cases
├── tests/api/                     # API tests
├── playwright.api.config.ts       # API-only Playwright config
├── package.json
└── README.md
```

The UI suite lives independently in the sibling `playwright-ui-automation-project` project.

## Documentation

- [API documentation](docs/README.md)
- [API test cases](docs/test-cases/api-suit.md)