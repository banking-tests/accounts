import { Service } from '@/core/application/service.decorator';
import { ApiKeysService } from '@/modules/auth/domain/contracts/api-keys.service';
import { ConfigService } from '@nestjs/config';

@Service()
export class PassportApiKeysService implements ApiKeysService {
  private key: string;

  constructor(private readonly configService: ConfigService) {
    this.key = this.configService.get('apiKey.value');
  }

  public validate(apiKey: string): boolean {
    return this.key === apiKey;
  }
}
