import { LoginRequest } from '../../../api/models/common/requests/LoginRequest';

export const apiUnauthenticatedUser: LoginRequest = {
  username: 'unauthenticated',

  password: 'aunauthenticatedpass',

  expirationTime: 30,
};
