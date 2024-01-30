import { Environment } from '@/core/domain/enums/environment.enum';
import { Request } from '@/core/infrastructure/types/http/request.type';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';

@Injectable()
export class TracerMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  public use(req: Request, res: Response, next: NextFunction) {
    const environment = this.configService.get<Environment>('environment.nodeEnv');
    const isTesting = environment === Environment.TESTING;
    const requestId = isTesting ? 'test' : Math.random().toString(36).substring(2, 15);
    req.requestId = requestId;
    next();
  }
}
