/* istanbul ignore file */
import {
  INestApplication,
  ModuleMetadata,
  Provider,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';

export async function createApp(
  metadata: ModuleMetadata,
  overrides: Provider[] = [],
): Promise<INestApplication> {
  const moduleFixture = await Test.createTestingModule(metadata);

  overrides.forEach((provider) => {
    if (typeof provider === 'object' && 'provide' in provider) {
      if ('useValue' in provider) {
        moduleFixture.overrideProvider(provider.provide).useValue(provider.useValue);
      } else if ('useClass' in provider) {
        moduleFixture
          .overrideProvider(provider.provide)
          .useClass(provider.useClass as Type<any>);
      } else if ('useFactory' in provider) {
        moduleFixture.overrideProvider(provider.provide).useFactory({
          factory: provider.useFactory,
          inject: provider.inject || [],
        });
      }
    }
  });

  const testingModule = await moduleFixture.compile();

  const app = testingModule.createNestApplication();

  app.enableVersioning();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  return app;
}
