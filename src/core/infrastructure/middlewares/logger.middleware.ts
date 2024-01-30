import { Request } from '@/core/infrastructure/types/http/request.type';
import { Inject, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject('LOGGER_SERVICE')
    private readonly logger: Logger,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/docs')) {
      return next();
    }

    const { method, path, query, cookies, body, requestId } = req;
    const start = Date.now();
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];
    let data: unknown;

    res.write = (...args: any[]): any => {
      chunks.push(Buffer.from(args[0]));
      oldWrite.apply(res, args);
    };

    res.end = (...args: any[]): any => {
      if (args[0]) {
        chunks.push(Buffer.from(args[0]));
      }
      data = Buffer.concat(chunks).toString('utf8');
      oldEnd.apply(res, args);
    };

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        JSON.stringify({
          requestId,
          status: res.statusCode,
          statusMessage: res.statusMessage,
          duration: `${duration} ms`,
          contentLength: `${res.get('Content-Length')} B`,
          data,
        }).replace(/\\"/g, '"'),
        'Response',
      );
    });

    this.logger.log(
      JSON.stringify({
        requestId,
        method,
        path,
        query,
        cookies,
        body,
      }).replace(/\\"/g, '"'),
      'Request',
    );

    next();
  }
}
