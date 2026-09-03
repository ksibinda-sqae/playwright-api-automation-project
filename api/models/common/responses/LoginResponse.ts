export interface LoginResponse {
  
  /******* AUTHENTICATED USER ********/

  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;

  /****** UNAUTHENTICATED USER *******/

  message: string;
}
