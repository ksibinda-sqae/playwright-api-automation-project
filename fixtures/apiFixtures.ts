import { test as base } from '@playwright/test';
import { AuthService } from '../application/services/AuthService';
import { AuthApiAssertions } from '../application/assertions/AuthApiAssertions';

export type APIFixtures = {
  authService: AuthService;
  authApiAssertions: AuthApiAssertions;
};

export const apiTest = base.extend<APIFixtures>({
  authService: async ({ request }, use) => {
    await use(new AuthService(request));
  },

  authApiAssertions: async ({}, use) => {
    await use(new AuthApiAssertions());
  },
});
