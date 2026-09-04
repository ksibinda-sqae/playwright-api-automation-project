import { expect } from '@playwright/test';
import { step } from 'allure-js-commons';
import { ApiResponse } from '../models/common/ApiResponse';
import { LoginResponse } from '../models/common/responses/LoginResponse';
import { LoginRequest } from '../models/common/requests/LoginRequest';

export class AuthApiAssertions {
  async assertAuthenticatedUser(response: ApiResponse<LoginResponse>, expectedRequest: LoginRequest): Promise<void> {
    await step('Verify login was successful', async () => {
      expect(response.ok).toBe(true);

      expect(response.status).toBe(200);

      expect(response.body.username).toBe(expectedRequest.username);

      expect(response.body.accessToken).toBeTruthy();

      expect(response.body.refreshToken).toBeTruthy();
    });
  }

  async assertUnauthenticatedUser(response: ApiResponse<LoginResponse>, expectedStatus: number): Promise<void> {
    await step('Verify login failed', async () => {
      expect(response.ok).toBe(false);

      expect(response.status).toBe(expectedStatus);

      const errorMessage: string = 'Invalid credentials';

      expect(response.body.message).toBe(errorMessage);
    });
  }
}
