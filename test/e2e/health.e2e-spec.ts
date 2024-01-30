import { createApp } from '#/setup';
import { HealthModule } from '@/modules/health/health.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

describe('/health', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createApp({
      imports: [HealthModule],
    });

    app.init();
  });

  it('GET /health', () => {
    return request(app.getHttpServer()).get('/health').expect(HttpStatus.OK);
  });
});
