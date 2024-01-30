/* istanbul ignore file */
import { InjectService } from '@/core/application/inject-service.decorator';
import { ApiKeysService } from '@/modules/auth/domain/contracts/api-keys.service';
import { API_KEYS_SERVICE_TOKEN } from '@/modules/auth/infrastructure/api-keys/services/api-keys.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(
    @InjectService(API_KEYS_SERVICE_TOKEN)
    private readonly apiKeysService: ApiKeysService,
  ) {
    super(
      {
        header: 'Authorization',
        prefix: 'ApiKey ',
      },
      false,
    );
  }

  public validate(apiKey: string): boolean {
    const key = this.apiKeysService.validate(apiKey);

    if (!key) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
