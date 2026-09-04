# API Test Cases (DummyJSON)

This catalog records the API scenarios in scope for this project. TC01 and TC02 are currently automated in `tests/api/auth/authentication.spec.ts`. TC03 through TC05 are documented scenarios for the next user-service coverage additions.

## Authentication

### TC01 - Successful Login

**Status:** Automated

`POST /auth/login`

- Expect HTTP `200`.
- Expect the response username to match the request username.
- Expect a non-empty access token and refresh token.

### TC02 - Unsuccessful Login

**Status:** Automated

`POST /auth/login`

- Expect HTTP `400`.
- Expect `ok` to be `false`.
- Expect the error message `Invalid credentials`.

## Users

### TC03 - Get Single User

**Status:** Documented, automation pending

`GET /users/{id}`

- Expect HTTP `200`.
- Expect a response matching the requested user ID.

### TC04 - Create User

**Status:** Documented, automation pending

`POST /users/add`

- Expect HTTP `201`.
- Expect the response to contain the created user data.

### TC05 - Update User

**Status:** Documented, automation pending

`PUT /users/{id}`

- Expect HTTP `200`.
- Expect the response to contain the updated user data.
