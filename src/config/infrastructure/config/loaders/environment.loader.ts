import { EnvironmentConfig } from '@/core/infrastructure/types/environment/environment.type';
import { registerAs } from '@nestjs/config';

export const environmentConfigLoader = registerAs(
  'environment',
  (): EnvironmentConfig => ({
    nodeEnv: process.env.NODE_ENV || 'development',
    debug: process.env.DEBUG === 'true',
  }),
);
