import { configOptions } from '@/config';
import { HttpExceptionFilter } from '@/core/infrastructure/filters/exception.filter';
import { TransformInterceptor } from '@/core/infrastructure/interceptors/transform.interceptor';
import { JsonLoggerService } from '@/core/infrastructure/logger/json.logger';
import { LoggerMiddleware } from '@/core/infrastructure/middlewares/logger.middleware';
import { TracerMiddleware } from '@/core/infrastructure/middlewares/tracer.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(configOptions)],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: 'LOGGER_SERVICE',
      useValue: JsonLoggerService.getInstance(),
    },
  ],
})
export class CoreModule {
  private debug: boolean;

  constructor(private readonly configService: ConfigService) {
    this.debug = this.configService.get('environment.debug');
  }

  configure(consumer: MiddlewareConsumer) {
    // Bind requestId to request
    consumer.apply(TracerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

    if (this.debug) {
      // Log request and response events
      consumer.apply(LoggerMiddleware).forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
    }
  }
}
