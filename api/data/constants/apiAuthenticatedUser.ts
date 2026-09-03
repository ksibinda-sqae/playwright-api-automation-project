import { LoginRequest } from '../../../api/models/common/requests/LoginRequest';
import { apiEnv } from '../../../config/environment/apiEnv';


  export const apiAuthenticatedUser: LoginRequest = {
    username: apiEnv.authenticatedUser.username,

    password: apiEnv.authenticatedUser.password,

    expirationTime: 30,
  };


