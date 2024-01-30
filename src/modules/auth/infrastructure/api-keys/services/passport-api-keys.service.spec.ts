import { ApiKeysService } from '@/modules/auth/domain/contracts/api-keys.service';
import {
  API_KEYS_SERVICE_TOKEN,
  ApiKeysService as PassportApiKeysService,
} from '@/modules/auth/infrastructure/api-keys/services/api-keys.service';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

describe('PassportApiKeysService', () => {
  let service: ApiKeysService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forFeature(() => {
          return {
            apiKey: {
              value: '123',
            },
          };
        }),
      ],
      providers: [PassportApiKeysService],
    }).compile();

    service = app.get(API_KEYS_SERVICE_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be a valid apiKey (123)', () => {
    expect(service.validate('123')).toBeTruthy();
  });
});
