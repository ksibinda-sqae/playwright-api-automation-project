# API Test Cases (DummyJSON)

### TC01 - Successful Login

`POST /auth/login`

- Expect HTTP `200`
- Expect an access token

### TC02 - Unsuccessful Login

`POST /auth/login`

- Expect HTTP `400`
- Expect an authentication error

### TC03 - Get Single User

`GET /users/{id}`

- Expect HTTP `200`

### TC04 - Create User

`POST /users/add`

- Expect HTTP `201`

### TC05 - Update User

`PUT /users/{id}`

- Expect HTTP `200`
