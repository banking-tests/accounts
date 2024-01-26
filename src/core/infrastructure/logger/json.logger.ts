import { JsonLoggerService as LoggerService } from 'json-logger-service';

export class JsonLoggerService {
  private static instance: LoggerService;

  private constructor() {
    // block constructor call
  }

  public static getInstance(): LoggerService {
    if (!JsonLoggerService.instance) {
      JsonLoggerService.instance = new LoggerService('nest');
    }

    return JsonLoggerService.instance;
  }
}
