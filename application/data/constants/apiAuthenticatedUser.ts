import { apiEnv } from '../../../config/environment/apiEnv';
import { LoginRequest } from '../../models/common/requests/LoginRequest';


  export const apiAuthenticatedUser: LoginRequest = {
    username: apiEnv.authenticatedUser.username,

    password: apiEnv.authenticatedUser.password,

    expirationTime: 30,
  };


