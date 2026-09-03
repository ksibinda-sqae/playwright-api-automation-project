import dotenv from 'dotenv';
import { PropertyReader } from '../PropertyReader';

const environment = process.env.TEST_ENV ?? 'dev';

dotenv.config({
  path: `config/environment/.env.${environment}`,
});

const properties = new PropertyReader('config/environment/application.properties');

function getEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const apiEnv = {
    
  baseUrl: properties.get('API_BASE_URL'),

  authenticatedUser: {
    username: getEnv('API_AUTHENTICATED_USERNAME'),
    password: getEnv('API_AUTHENTICATED_USER_PASSWORD'),
  },
};
