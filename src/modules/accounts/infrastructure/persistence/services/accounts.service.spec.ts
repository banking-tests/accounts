import DataStore = require('nedb-promises');
import { accountsMock } from '#/accounts/accounts.mock';
import { AccountsRepositoryToken } from '@/modules/accounts/domain/contracts/accounts.repository';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountIsNotActiveException } from '@/modules/accounts/domain/exceptions/account-is-not-active.exception';
import { Balance } from '@/modules/accounts/domain/value-objects/balance.value-object';
import { AccountModel } from '@/modules/accounts/infrastructure/persistence/database/models/account.model';
import { AccountsMemoryRepository } from '@/modules/accounts/infrastructure/persistence/memory/repositories/accounts.memory.repository';
import { AccountsService } from '@/modules/accounts/infrastructure/persistence/services/accounts.service';
import { Test } from '@nestjs/testing';

describe('AccountsService', () => {
  let accountsService: AccountsService;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: AccountModel.name,
          useValue: DataStore.create(),
        },
        {
          provide: AccountsRepositoryToken,
          useClass: AccountsMemoryRepository,
        },
      ],
    }).compile();

    accountsService = app.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(accountsService).toBeDefined();
  });

  it('should return an array of accounts', async () => {
    await accountsService.createMany(accountsMock);
    const result = await accountsService.find({ isDeleted: false });
    expect(result).toHaveLength(3);
    result.map((account) => {
      expect(account.getNumber()).toBeDefined();
      expect(account.getBalance()).toBeDefined();
      expect(account.getCurrency()).toBeDefined();
      expect(account.getStatus()).toBeDefined();
      expect(account.getType()).toBeDefined();
    });
  });

  it('should return an account', async () => {
    const account = await accountsService.create(accountsMock[0]);
    const result = await accountsService.findOne({ uuid: account.getUuid() });
    expect(result).toBeDefined();
    expect(result.getNumber().getValue()).toBe(accountsMock[0].number);
    expect(result.getBalance().getValue()).toBe(accountsMock[0].balance);
    expect(result.getCurrency()).toBe(accountsMock[0].currency);
    expect(result.getStatus().getValue()).toBe(accountsMock[0].status);
    expect(result.getType()).toBe(accountsMock[0].type);
  });

  it('should fail if account does not exist', async () => {
    const result = await accountsService.findOne({ uuid: '123' });
    expect(result).toBeUndefined();
  });

  it('should create an account', async () => {
    const result = await accountsService.create(accountsMock[0]);
    expect(result).toBeDefined();
    expect(result.getNumber().getValue()).toBe(accountsMock[0].number);
    expect(result.getBalance().getValue()).toBe(accountsMock[0].balance);
    expect(result.getCurrency()).toBe(accountsMock[0].currency);
    expect(result.getStatus().getValue()).toBe(accountsMock[0].status);
    expect(result.getType()).toBe(accountsMock[0].type);
  });

  it('should create many accounts', async () => {
    const result = await accountsService.createMany(accountsMock);
    expect(result).toHaveLength(accountsMock.length);
    result.map((account) => {
      expect(account.getNumber().getValue()).toBeDefined();
      expect(account.getBalance().getValue()).toBeDefined();
      expect(account.getCurrency()).toBeDefined();
      expect(account.getStatus().getValue()).toBeDefined();
      expect(account.getType()).toBeDefined();
    });
  });

  it('should update an account', async () => {
    const account = await accountsService.create(accountsMock[0]);
    const result = await accountsService.update(
      { uuid: account.getUuid() },
      { status: AccountStatus.CLOSED },
    );
    expect(result).toBeDefined();
    expect(result.isClosed()).toBeTruthy();
  });

  it('should update balance of an account', async () => {
    const account = await accountsService.create(accountsMock[0]);
    account.updateBalance(new Balance(100));
    const result = await accountsService.update(
      { uuid: account.getUuid() },
      { balance: account.getBalance().getValue() },
    );
    expect(result).toBeDefined();
    expect(result.getBalance().getValue()).toBe(100);
  });

  it('should fail trying to update balance of a closed account', async () => {
    expect.assertions(1);
    const account = await accountsService.create({
      ...accountsMock[0],
      status: AccountStatus.CLOSED,
    });
    try {
      account.updateBalance(new Balance(100));
    } catch (error) {
      expect(error).toBeInstanceOf(AccountIsNotActiveException);
    }
  });
});
