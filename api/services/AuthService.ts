import { step } from 'allure-js-commons';
import { AllureHelper } from '../../core/reporting/AllureHelper';
import { LoginRequest } from '../models/common/requests/LoginRequest';
import { BaseApiClient } from '../clients/BaseApiClient';
import { ApiResponse } from '../models/common/ApiResponse';
import { LoginResponse } from '../models/common/responses/LoginResponse';



export class AuthService extends BaseApiClient {

  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {

    const authEndpoint: string = '/auth/login';

    return await step('Authenticate user', async () => {

      await AllureHelper.attachText('Endpoint', authEndpoint);

      await AllureHelper.attachJson('Request', request);

      const response = await this.post<LoginResponse, LoginRequest>(authEndpoint, request);

      await AllureHelper.attachJson('Response', response.body);

      await AllureHelper.attachText('Status Code', response.status.toString());

      return response;

    });

  }
}