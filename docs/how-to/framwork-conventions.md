# Framework Conventions

This guide defines the naming, structure, and coding practices for extending the Playwright API framework consistently.

## Naming and placement

- Use PascalCase filenames for TypeScript classes and models, matching the existing codebase: `AuthService.ts`, `BaseApiClient.ts`, and `LoginRequest.ts`.
- Use descriptive lower-case folders for test domains, such as `tests/api/auth/`.
- Name specs with the `.spec.ts` suffix.
- Use `Service` for endpoint workflow classes, `Request` and `Response` for transport models, `Assertions` for verification helpers, and `Factory` for generated or selected test data.
- Keep API tests under `tests/api/`; do not place API behavior in the sibling UI project.

## Layer responsibilities

### Tests

Tests describe business scenarios and compose factories, services, and assertions. They should not build full URLs, call `request.get` directly, parse response JSON, or duplicate shared status and payload checks.

### Services

Services expose verbs that describe an API operation, accept typed request data, call the base client, and return `ApiResponse<T>`. Keep endpoint paths in the service that owns the endpoint domain.

### Base client

Use `BaseApiClient` for HTTP methods and common transport behavior. Preserve its logging and `FrameworkError` wrapping when adding operations. Keep response parsing centralized so callers receive the same response shape.

### Models

Use interfaces or types for request and response contracts. Keep shared response primitives in `models/common/`. Put endpoint-specific models in a domain-appropriate location when they are not reusable.

### Assertions

Put reusable domain checks in assertion helpers. Assertions should verify observable behavior, including status, `ok`, required fields, and meaningful relationships between request and response data.

### Data

Factories should provide intentional variants such as authenticated and unauthenticated credentials. Avoid random data unless the test requires uniqueness and records the generated value in its diagnostics.

## TypeScript style

- Keep public methods explicitly typed, especially service and assertion methods.
- Prefer `unknown` over `any` for values whose shape is not known yet.
- Reuse `ApiResponse<T>` rather than returning raw Playwright responses from services.
- Use `async`/`await` consistently and await Allure steps and attachments.
- Follow the existing single-quote style in new files unless the surrounding file already uses another style.
- Avoid unrelated formatting or refactoring in a test change.

## Environment and secrets

`TEST_ENV` is the environment selector and defaults to `dev`. The selected `.env.<environment>` file provides credentials; `application.properties` provides non-secret `API_BASE_URL`. New environments should follow the same naming convention and must be represented in the project setup documentation. Never put credentials in TypeScript, properties committed to source control, test titles, or Allure attachments.

## Allure evidence

Use `AllureHelper.attachText` for concise values and `AllureHelper.attachJson` for structured request or response data. Do not attach secrets or tokens. Use `step` for a meaningful business operation, not for every trivial statement.

## Error handling

Let the base client convert transport failures into `FrameworkError` with the HTTP operation and endpoint context. Assertions should fail with the expected status or field mismatch rather than swallowing errors. Avoid catch-and-ignore behavior in services and tests.

## Change checklist

Before opening a change for review, confirm that the new code has a typed model, uses the correct service and fixture boundary, follows the tag convention, avoids secret leakage, updates the test-case documentation, and passes the narrowest relevant Playwright command.
