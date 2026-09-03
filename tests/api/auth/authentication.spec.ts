import { apiTest } from '../../../api/fixtures/apiFixtures';
import { ApiUserFactory } from '../../../api/data/factory/ApiUserFactory';

apiTest(
  'TC01 - Successful Login',
  { tag: ['@api', '@auth', '@smoke', '@reg'] },
  async ({ authService, authApiAssertions }) => {
    const credentials = ApiUserFactory.authenticated();

    const loginResponse = await authService.login(credentials);

    await authApiAssertions.assertAuthenticatedUser(loginResponse, credentials);
  }
);

apiTest(
  'TC02 - Unsuccessful Login',
  { tag: ['@api', '@auth', '@smoke', '@reg'] },
  async ({ authService, authApiAssertions }) => {
    const credentials = ApiUserFactory.unauthenticated();

    const loginResponse = await authService.login(credentials);

    await authApiAssertions.assertUnauthenticatedUser(loginResponse, 400);
  }
);
