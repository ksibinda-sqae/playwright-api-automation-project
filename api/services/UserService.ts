import { step } from "allure-js-commons";
import { AllureHelper } from "../../core/reporting/AllureHelper";
import { ApiResponse } from "../models/common/ApiResponse";
import { UserRequest } from "../models/common/requests/UserRequest";
import { UserResoponse } from "../models/common/responses/UserResponse";
import { BaseApiClient } from "../clients/BaseApiClient";

export class UserService extends BaseApiClient{

  async getUser(request: UserRequest): Promise<ApiResponse<UserResoponse>> {

    const usersEndpoint: string = 'users';

    return await step('Authenticate user', async () => {

      await AllureHelper.attachText('Endpoint', usersEndpoint);

      await AllureHelper.attachJson('Request', request);

      const response = (await this.get<UserResoponse>(usersEndpoint));

      await AllureHelper.attachJson('Response', response.body);

      await AllureHelper.attachText('Status Code', response.status.toString());

      return response;

    });

  }
}