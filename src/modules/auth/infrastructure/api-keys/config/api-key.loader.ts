import { registerAs } from '@nestjs/config';

export const apiKeyLoader = registerAs('apiKey', () => ({
  value: process.env.API_KEY,
}));
