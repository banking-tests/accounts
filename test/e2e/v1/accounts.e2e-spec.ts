import { accountsMock } from '#/accounts/accounts.mock';
import { config } from '#/config';
import { createApp } from '#/setup';
import { CoreModule } from '@/core/core.module';
import { useCases } from '@/modules/accounts/application/use-cases';
import {
  AccountsRepository,
  AccountsRepositoryToken,
} from '@/modules/accounts/domain/contracts/accounts.repository';
import { AccountsServiceToken } from '@/modules/accounts/domain/contracts/accounts.service';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountsController } from '@/modules/accounts/infrastructure/http/controllers/accounts.controller';
import { AccountModel } from '@/modules/accounts/infrastructure/persistence/database/models/account.model';
import { AccountsMemoryRepository } from '@/modules/accounts/infrastructure/persistence/memory/repositories/accounts.memory.repository';
import { AccountsService } from '@/modules/accounts/infrastructure/persistence/services/accounts.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { UuidModule } from 'nestjs-uuid';
import * as request from 'supertest';
import DataStore = require('nedb-promises');

const accountPayload = {
  currency: 'MXN',
  type: 'debit',
  holderUuid: '77d4bf51-fb1e-4a88-9551-7bd29a463ff6',
};

describe('/v1/accounts', () => {
  let app: INestApplication;
  let accountsRepository: AccountsRepository;

  beforeEach(async () => {
    app = await createApp({
      imports: [UuidModule, AuthModule, CoreModule],
      controllers: [AccountsController],
      providers: [
        ...useCases,
        {
          provide: AccountsServiceToken,
          useClass: AccountsService,
        },
        {
          provide: AccountModel.name,
          useValue: DataStore.create(),
        },
        {
          provide: AccountsRepositoryToken,
          useClass: AccountsMemoryRepository,
        },
      ],
    });

    accountsRepository = app.get<AccountsMemoryRepository>(AccountsRepositoryToken);

    await app.init();
  });

  describe('GET /v1/accounts', () => {
    it('GET /v1/accounts with API key should response HTTP 200', async () => {
      await accountsRepository.createMany(accountsMock);
      const limit = 10;
      const page = 1;
      const response = await request(app.getHttpServer())
        .get('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.body).toHaveProperty('requestId');
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('statusCode');
      expect(response.body).toHaveProperty('type');
      expect(response.body.data).toHaveProperty('docs');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('limit');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('pages');
      expect(response.body.data).toHaveProperty('prevPage');
      expect(response.body.data).toHaveProperty('nextPage');
      expect(response.body.data).toHaveProperty('hasMore');
      expect(response.body.data.docs).toHaveLength(limit);
      expect(response.body.data.total).toBe(accountsMock.length);
      expect(response.body.data.limit).toBe(limit);
      expect(response.body.data.page).toBe(1);
      expect(response.body.data.pages).toBe(Math.ceil(accountsMock.length / limit));
      expect(response.body.data.prevPage).toBeNull();
      expect(response.body.data.nextPage).toBe(page + 1);
      expect(response.body.data.hasMore).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('GET /v1/accounts with API key and page 2 should response HTTP 200', async () => {
      await accountsRepository.createMany(accountsMock);
      const limit = 10;
      const page = 2;
      const response = await request(app.getHttpServer())
        .get('/v1/accounts')
        .query({ page })
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.body).toHaveProperty('requestId');
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('statusCode');
      expect(response.body).toHaveProperty('type');
      expect(response.body.data).toHaveProperty('docs');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('limit');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('pages');
      expect(response.body.data).toHaveProperty('prevPage');
      expect(response.body.data).toHaveProperty('nextPage');
      expect(response.body.data).toHaveProperty('hasMore');
      expect(response.body.data.docs).toHaveLength(limit);
      expect(response.body.data.total).toBe(accountsMock.length);
      expect(response.body.data.limit).toBe(limit);
      expect(response.body.data.page).toBe(page);
      expect(response.body.data.pages).toBe(Math.ceil(accountsMock.length / limit));
      expect(response.body.data.prevPage).toBe(page - 1);
      expect(response.body.data.nextPage).toBe(page + 1);
      expect(response.body.data.hasMore).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('GET /v1/accounts with API key with page 1 and limit 20 should response HTTP 200', async () => {
      await accountsRepository.createMany(accountsMock);
      const limit = 20;
      const page = 1;
      const response = await request(app.getHttpServer())
        .get('/v1/accounts')
        .query({ page, limit })
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.body).toHaveProperty('requestId');
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('statusCode');
      expect(response.body).toHaveProperty('type');
      expect(response.body.data).toHaveProperty('docs');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('limit');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('pages');
      expect(response.body.data).toHaveProperty('prevPage');
      expect(response.body.data).toHaveProperty('nextPage');
      expect(response.body.data).toHaveProperty('hasMore');
      expect(response.body.data.docs).toHaveLength(limit);
      expect(response.body.data.limit).toBe(limit);
      expect(response.body.data.total).toBe(accountsMock.length);
      expect(response.body.data.page).toBe(page);
      expect(response.body.data.pages).toBe(Math.ceil(accountsMock.length / limit));
      expect(response.body.data.prevPage).toBeNull();
      expect(response.body.data.nextPage).toBe(page + 1);
      expect(response.body.data.hasMore).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('GET /v1/accounts with API key with holderUuid = 95ed3cbd-0d02-4e03-b14b-9c6a60c820ec should response HTTP 200', async () => {
      await accountsRepository.createMany(accountsMock);
      const response = await request(app.getHttpServer())
        .get('/v1/accounts')
        .query({ holderUuid: '95ed3cbd-0d02-4e03-b14b-9c6a60c820ec' })
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.body).toHaveProperty('requestId');
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('statusCode');
      expect(response.body).toHaveProperty('type');
      expect(response.body.data).toHaveProperty('docs');
      expect(response.body.data).toHaveProperty('total');
      expect(response.body.data).toHaveProperty('limit');
      expect(response.body.data).toHaveProperty('page');
      expect(response.body.data).toHaveProperty('pages');
      expect(response.body.data).toHaveProperty('prevPage');
      expect(response.body.data).toHaveProperty('nextPage');
      expect(response.body.data).toHaveProperty('hasMore');
      expect(response.body.data.docs).toHaveLength(2);
      expect(response.body.data.total).toBe(2);
      expect(response.body.data.limit).toBe(10);
      expect(response.body.data.page).toBe(1);
      expect(response.body.data.pages).toBe(1);
      expect(response.body.data.prevPage).toBeNull();
      expect(response.body.data.nextPage).toBeNull();
      expect(response.body.data.hasMore).toBeFalsy();
      expect(response.statusCode).toBe(HttpStatus.OK);
      response.body.data.docs.map((account) =>
        expect(account.holderUuid).toBe('95ed3cbd-0d02-4e03-b14b-9c6a60c820ec'),
      );
    });

    it('GET /v1/accounts without API key should response HTTP 401', async () => {
      return request(app.getHttpServer()).get('/v1/accounts').expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('GET /v1/accounts/:uuid', () => {
    it('GET /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4 with API key should response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .get('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.OK);
    });

    it('GET /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4 without API key should response HTTP 401', async () => {
      return request(app.getHttpServer())
        .get('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('GET /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622 should response HTTP 404', async () => {
      return request(app.getHttpServer())
        .get('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('POST /v1/accounts', () => {
    it('POST /v1/accounts with API key and correct data should response HTTP 201', () => {
      return request(app.getHttpServer())
        .post('/v1/accounts')
        .send(accountPayload)
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.CREATED);
    });

    it('POST /v1/accounts with API key but missing currency should response HTTP 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          type: accountPayload.type,
          holderUuid: accountPayload.holderUuid,
        });

      expect(
        response.body.message.at(0).includes('currency must be one of the following values:'),
      ).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /v1/accounts with API key but missing type should response HTTP 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          currency: accountPayload.currency,
          holderUuid: accountPayload.holderUuid,
        });

      expect(
        response.body.message.at(0).includes('type must be one of the following values:'),
      ).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /v1/accounts with API key but missing holderUuid should response HTTP 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          currency: accountPayload.currency,
          type: accountPayload.type,
        });

      expect(response.body.message.at(0).includes('holderUuid must be a UUID')).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /v1/accounts with API key but invalid holderUuid should response HTTP 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          currency: accountPayload.currency,
          type: accountPayload.type,
          holderUuid: 'kim-wexler',
        });

      expect(response.body.message.at(0).includes('holderUuid must be a UUID')).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /v1/accounts with API key but unsupported currency should response HTTP 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          currency: 'CLP',
          type: accountPayload.type,
          holderUuid: accountPayload.holderUuid,
        });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.body.requestId).toBe('test');
      expect(
        response.body.message.at(0).includes('currency must be one of the following values:'),
      ).toBeTruthy();
    });

    it('POST /v1/accounts with API key but empty body should response HTTP 400', async () => {
      const response = await request(app.getHttpServer())
        .post('/v1/accounts')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({});

      expect(response.body.message).toHaveLength(3);
      response.body.message.map((error) => expect(error).toMatch(/\w must be \w/g));
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('POST /v1/accounts without API key but correct data should response HTTP 401', () => {
      return request(app.getHttpServer())
        .post('/v1/accounts')
        .send(accountPayload)
        .expect(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('PATCH /v1/accounts/:uuid/balance', () => {
    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and balance -100 response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          balance: -100,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and balance -1.5 response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          balance: -1.5,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and balance 0 response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          balance: 0,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and balance 1.5 response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          balance: 1.5,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and balance 100 response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          balance: 100,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and balance 1000000 response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({
          balance: 1_000_000,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and an empty object response HTTP 400', async () => {
      await accountsRepository.create(accountsMock[0]);
      const response = await request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .send({});

      expect(response.body.message.at(0).includes('balance must be a number')).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance with API key and missing body response HTTP 400', async () => {
    await accountsRepository.create(accountsMock[0]);
    const response = await request(app.getHttpServer())
      .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
      .set({
        Authorization: `ApiKey ${config.apiKey}`,
      });

    expect(response.body.message.at(0).includes('balance must be a number')).toBeTruthy();
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance without API key response HTTP 400', async () => {
    await accountsRepository.create(accountsMock[0]);
    const response = await request(app.getHttpServer())
      .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/balance')
      .send({
        balance: 100,
      });

    expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
  });

  describe('PATCH /v1/accounts/:uuid/lock', () => {
    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/lock with API key and active status response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/lock')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/lock without API key response HTTP 401', async () => {
      return request(app.getHttpServer())
        .patch('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/lock')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('PATCH /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/lock with API key response HTTP 404', async () => {
      return request(app.getHttpServer())
        .patch('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/lock')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/lock with API key and locked status response HTTP 409', async () => {
      await accountsRepository.create({
        ...accountsMock[0],
        status: AccountStatus.LOCKED,
      });
      const response = await request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/lock')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.statusCode).toBe(HttpStatus.CONFLICT);
      expect(response.body.message).toBe('Invalid transition from locked to locked');
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/lock with API key and closed status response HTTP 409', async () => {
      await accountsRepository.create({
        ...accountsMock[0],
        status: AccountStatus.CLOSED,
      });
      const response = await request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/lock')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.statusCode).toBe(HttpStatus.CONFLICT);
      expect(response.body.message).toBe('Invalid transition from closed to locked');
    });
  });

  describe('PATCH /v1/accounts/:uuid/activate', () => {
    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/activate with API key and locked status response HTTP 200', async () => {
      await accountsRepository.create({
        ...accountsMock[0],
        status: AccountStatus.LOCKED,
      });
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/activate')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/activate without API key response HTTP 401', async () => {
      return request(app.getHttpServer())
        .patch('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/activate')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('PATCH /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/activate with API key response HTTP 404', async () => {
      return request(app.getHttpServer())
        .patch('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/activate')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/activate with API key and active status response HTTP 409', async () => {
      await accountsRepository.create(accountsMock[0]);
      const response = await request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/activate')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.statusCode).toBe(HttpStatus.CONFLICT);
      expect(response.body.message).toBe('Invalid transition from active to active');
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/activate with API key and closed status response HTTP 409', async () => {
      await accountsRepository.create({
        ...accountsMock[0],
        status: AccountStatus.CLOSED,
      });
      const response = await request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/activate')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.statusCode).toBe(HttpStatus.CONFLICT);
      expect(response.body.message).toBe('Invalid transition from closed to active');
    });
  });

  describe('PATCH /v1/accounts/:uuid/close', () => {
    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/close with API key and active status response HTTP 200', async () => {
      await accountsRepository.create(accountsMock[0]);
      return request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/close')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.OK);
    });

    it('PATCH /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/close without API key response HTTP 401', async () => {
      return request(app.getHttpServer())
        .patch('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/close')
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('PATCH /v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/close with API key response HTTP 404', async () => {
      return request(app.getHttpServer())
        .patch('/v1/accounts/45dc50aa-14c9-47db-8101-4768a55f0622/close')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        })
        .expect(HttpStatus.NOT_FOUND);
    });

    it('PATCH /v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/close with API key and closed status response HTTP 409', async () => {
      await accountsRepository.create({
        ...accountsMock[0],
        status: AccountStatus.CLOSED,
      });
      const response = await request(app.getHttpServer())
        .patch('/v1/accounts/569086ba-2b8d-4e9e-8cc9-0e55002faec4/close')
        .set({
          Authorization: `ApiKey ${config.apiKey}`,
        });

      expect(response.statusCode).toBe(HttpStatus.CONFLICT);
      expect(response.body.message).toBe('Invalid transition from closed to closed');
    });
  });

  afterEach(() => {
    app.close();
  });
});
