import { LoginRequest } from '../../models/common/requests/LoginRequest';
import { apiAuthenticatedUser } from '../constants/apiAuthenticatedUser';
import { apiUnauthenticatedUser } from '../constants/apiUnauthenticatedUser';

export class ApiUserFactory {

    static authenticated(): LoginRequest{
        return apiAuthenticatedUser;
    }

    static unauthenticated(): LoginRequest{
        return apiUnauthenticatedUser;
    }
}