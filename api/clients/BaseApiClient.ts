import { APIRequestContext, APIResponse } from '@playwright/test';

import { logger } from '../../core/logger/logger';
import { FrameworkError } from '../../core/errors/frameworkError';
import { ApiResponse } from '../models/common/ApiResponse';
import { apiEnv } from '../../config/environment/apiEnv';



export class BaseApiClient {
  constructor(protected readonly request: APIRequestContext) {}

  private buildUrl(endpoint: string): string {
    return `${apiEnv.baseUrl}${endpoint}`;
  }

  async get<TResponse>(endpoint: string): Promise<ApiResponse<TResponse>> {
    try {
      logger.info(`GET ${endpoint}`);

      const response = await this.request.get(this.buildUrl(endpoint));

      logger.info(`GET ${endpoint} - ${response.status()}`);

      return this.buildResponse<TResponse>(response)
      
    } catch (error) {
      logger.error(`GET failed: ${endpoint}`);

      throw new FrameworkError(`GET failed: ${endpoint}`, error);
    }
  }

  async post<TResponse, TRequest>(endpoint: string, payload: TRequest): Promise<ApiResponse<TResponse>> {
    try {
      logger.info(`POST ${endpoint}`);

      const response = await this.request.post(this.buildUrl(endpoint), {
        data: payload,
      });

      logger.info(`POST ${endpoint} - ${response.status()}`);

      return this.buildResponse<TResponse>(response)

    } catch (error) {
      logger.error(`POST failed: ${endpoint}`);

      throw new FrameworkError(`POST failed: ${endpoint}`, error);
    }
  }

  async put<TResponse, TRequest>(endpoint: string, payload: TRequest): Promise<ApiResponse<TResponse>> {
    try {
      logger.info(`PUT ${endpoint}`);

      const response = await this.request.put(this.buildUrl(endpoint), {
        data: payload,
      });

      logger.info(`PUT ${endpoint} - ${response.status()}`);

      return this.buildResponse<TResponse>(response)

    } catch (error) {
      logger.error(`PUT failed: ${endpoint}`);

      throw new FrameworkError(`PUT failed: ${endpoint}`, error);
    }
  }

  async delete<TResponse>(endpoint: string): Promise<ApiResponse<TResponse>> {
    try {
      logger.info(`DELETE ${endpoint}`);

      const response = await this.request.delete(this.buildUrl(endpoint));

      logger.info(`DELETE ${endpoint} - ${response.status()}`);

      return this.buildResponse<TResponse>(response);
      
    } catch (error) {
      logger.error(`DELETE failed: ${endpoint}`);

      throw new FrameworkError(`DELETE failed: ${endpoint}`, error);
    }
  }

  private async buildResponse<T>(response: APIResponse): Promise<ApiResponse<T>> {
    return {
      status: response.status(),
      headers: response.headers(),
      ok: response.ok(),
      body: (await response.json()) as T,
    };
  }
}
