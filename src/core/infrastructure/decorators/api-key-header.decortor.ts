import { ApiKeyGuard } from '@/modules/auth/infrastructure/api-keys/guards/api-key.guard';
import { HttpStatus, UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function ApiKeyHeader(description: string) {
  return applyDecorators(
    ApiOperation({ summary: description }),
    UseGuards(ApiKeyGuard),
    ApiSecurity('Authorization'),
    ApiUnauthorizedResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Invalid credentials or expired api key',
    }),
    ApiNotFoundResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Resource not found',
    }),
    ApiTooManyRequestsResponse({
      status: HttpStatus.TOO_MANY_REQUESTS,
      description: 'Too many requests in a short time',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
