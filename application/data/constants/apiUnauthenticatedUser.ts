import { LoginRequest } from '../../models/common/requests/LoginRequest';

export const apiUnauthenticatedUser: LoginRequest = {
  username: 'unauthenticated',

  password: 'aunauthenticatedpass',

  expirationTime: 30,
};
