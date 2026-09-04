# Architecture Overview

## Purpose

This project is a TypeScript test suite for API workflows executed with Playwright Test. It currently targets DummyJSON and keeps transport, business workflows, test data, assertions, and test orchestration in separate layers.

## Request flow

```text
API test
  -> apiTest fixture
  -> service (AuthService, ...)
  -> BaseApiClient
  -> Playwright APIRequestContext
  -> configured API_BASE_URL + endpoint
  -> ApiResponse<T>
  -> API assertion helper
```

The test owns the scenario and expected outcome. The service owns the endpoint workflow. The base client owns HTTP transport and response normalization. Assertions own verification.

## Directory responsibilities

| Location          | Responsibility                                                                       |
| ----------------- | ------------------------------------------------------------------------------------ |
| `tests/api/`      | Playwright API specs, scenario names, tags, and fixture consumption.                 |
| `fixtures/`       | Typed Playwright fixtures that construct reusable services and assertion helpers.    |
| `services/`       | Endpoint-oriented workflows such as login or user operations.                        |
| `clients/`        | Shared HTTP operations, URL construction, logging, and `FrameworkError` translation. |
| `models/`         | Request, response, and shared response types.                                        |
| `data/`           | Factories and constants for valid and invalid test data.                             |
| `assertions/`     | Domain-specific verification helpers.                                                |
| `config/`         | Property loading and environment selection.                                          |
| `core/errors/`    | Framework-level error type.                                                          |
| `core/logger/`    | Winston-based logging.                                                               |
| `core/reporting/` | Allure attachment helpers.                                                           |
| `docs/`           | Project documentation and test-case catalog.                                         |

## Configuration flow

1. `TEST_ENV` selects an environment and defaults to `dev`.
2. `config/environment/apiEnv.ts` loads `config/environment/.env.<TEST_ENV>` with `dotenv`.
3. `application.properties` supplies `API_BASE_URL`.
4. `API_AUTHENTICATED_USERNAME` and `API_AUTHENTICATED_USER_PASSWORD` are read from the selected environment variables.
5. Missing required values fail fast when `apiEnv` is loaded.

Keep credentials in local `.env.*` files or CI secrets. Do not commit credentials or generated reports.

## Service and client boundaries

`BaseApiClient` exposes generic `get`, `post`, `put`, and `delete` methods and returns the project-wide `ApiResponse<T>` shape:

```ts
{
  status: number;
  headers: Record<string, string>;
  ok: boolean;
  body: T;
}
```

A service should expose meaningful API operations and use typed request and response models. It should not duplicate URL construction, low-level logging, or raw response parsing. Attach endpoint, request, response, and status details through `AllureHelper` when the operation benefits from diagnostic evidence.

## Fixture composition

Tests import `apiTest` from `fixtures/apiFixtures.ts`. Add a service or assertion helper to the fixture type and initializer when it is intended for broad reuse. Keep one-off data in the test or a factory rather than creating global mutable state.

## Reporting and diagnostics

The base Playwright config produces an HTML report and Allure results. The client logs request method, endpoint, and status, while services add Allure steps and payload attachments. Failed CI retries retain Playwright traces because `trace` is configured as `on-first-retry`.

## Adding an endpoint

1. Add or update request and response models.
2. Add reusable data in `data/` when the scenario needs stable variants.
3. Add the endpoint workflow to the relevant service, or create a service when the domain is new.
4. Add a domain assertion helper for repeated checks.
5. Register reusable services and assertions in `apiFixtures.ts`.
6. Add tagged tests under `tests/api/`.
7. Update `docs/test-cases/api-suit.md` and run the focused test command.
