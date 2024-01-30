import { Request } from '@/core/infrastructure/types/http/request.type';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Ctx = createParamDecorator((_data: null, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return {
    requestId: request.requestId,
  };
});
