import { PassportApiKeysService } from '@/modules/auth/infrastructure/api-keys/services/passport-api-keys.service';
import { Provider } from '@nestjs/common';

export const API_KEYS_SERVICE_TOKEN = 'API_KEYS_SERVICE';

export const ApiKeysService: Provider = {
  provide: API_KEYS_SERVICE_TOKEN,
  useClass: PassportApiKeysService,
};
