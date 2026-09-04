# Testing Conventions

## Test shape

Use the shared `apiTest` fixture and keep each test focused on one observable scenario:

```ts
apiTest(
  'TC01 - Successful Login',
  { tag: ['@api', '@auth', '@smoke', '@reg'] },
  async ({ authService, authApiAssertions }) => {
    const credentials = ApiUserFactory.authenticated();
    const response = await authService.login(credentials);

    await authApiAssertions.assertAuthenticatedUser(response, credentials);
  }
);
```

The current suite uses scenario IDs in titles, domain tags such as `@auth`, and suite tags such as `@api`, `@smoke`, and `@reg`.

## Assertions

Assert the contract that matters to the scenario:

- HTTP status and `response.ok`.
- Required response fields and their types or truthiness.
- Relationships between request data and response data.
- Error status and error message for negative cases.

Prefer assertion helpers when checks are reused or represent domain meaning. Keep test-specific expectations close to the scenario.

## Test data

Use a factory or stable data provider for valid and invalid inputs. Keep credentials outside source control. Do not rely on a preceding test to create state for the next test; tests must remain independently runnable and compatible with `fullyParallel: true`.

## Tags and commands

Run all API tests:

```bash
npm test
```

Run the default development environment with the API tag:

```bash
npm run test:api
```

Run a selected environment:

```bash
npm run test:dev
npm run test:qa
```

Run tag-based suites:

```bash
npm run test:auth
npm run test:smoke
npm run test:func
npm run test:reg
```

Run a single file or test title through Playwright:

```bash
npx playwright test tests/api/auth/authentication.spec.ts --config=playwright.api.config.ts
npx playwright test --config=playwright.api.config.ts --grep "TC01"
```

The tag scripts clean Allure results before execution. The direct `npm test`, `test:dev`, and `test:qa` scripts do not clean reports automatically.

## Debugging

Use the debug script for an interactive run:

```bash
npm run test:debug
```

Use Playwright’s HTML report after a run when you need test steps, traces, or failure details. Traces are collected on the first retry, and CI uses two workers with up to two retries.

## Allure reporting

Generate a static report:

```bash
npm run report:generate
npm run report:open
```

Serve results directly during local investigation:

```bash
npm run report:allure
```

Clean generated Allure files before a fresh run:

```bash
npm run clean:reports
```

Never publish or commit reports containing credentials, access tokens, or other sensitive payloads.

## Adding coverage

1. Select or create the domain folder under `tests/api/`.
2. Add a scenario with a unique test-case ID.
3. Apply `@api` plus the relevant domain and suite tags.
4. Reuse a fixture-provided service and assertion helper.
5. Add the scenario to `docs/test-cases/api-suit.md`.
6. Run the focused test first, then the relevant tag suite.
7. Inspect the HTML or Allure report if the result is unexpected.

## Test review checklist

- The test can run in isolation.
- The test does not depend on execution order or shared mutable state.
- The request uses a typed model or factory.
- Positive and negative paths assert the correct status and payload contract.
- No secrets or tokens appear in source, titles, logs, or attachments.
- The test is tagged consistently and documented in the test-case catalog.
