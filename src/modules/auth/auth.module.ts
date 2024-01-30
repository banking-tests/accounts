import { apiKeyLoader } from '@/modules/auth/infrastructure/api-keys/config/api-key.loader';
import { ApiKeyGuard } from '@/modules/auth/infrastructure/api-keys/guards/api-key.guard';
import { ApiKeysService } from '@/modules/auth/infrastructure/api-keys/services/api-keys.service';
import { ApiKeyStrategy } from '@/modules/auth/infrastructure/api-keys/strategies/api-key.strategy';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forFeature(() => ({
      apiKey: apiKeyLoader(),
    })),
  ],
  providers: [ApiKeysService, ApiKeyGuard, ApiKeyStrategy],
})
export class AuthModule {}
