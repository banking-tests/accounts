import { AccountEntity } from '@/modules/accounts/domain/entities/account.entity';
import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';

describe('AccountEntity', () => {
  const accountPayload = {
    uuid: 'e05e6dd7-4b70-418a-a4a9-225a31443b40',
    name: 'Test account',
    number: '123456789012345332',
    currency: Currency.USD,
    balance: 100,
    status: AccountStatus.ACTIVE,
    type: AccountType.DEBIT,
    holderUuid: '82962716-9bfa-4e47-a768-4f6ea320eedc',
  };

  it('should have static create method', () => {
    expect(AccountEntity.create).toBeDefined();
  });

  it('should create an account entity', () => {
    const account = AccountEntity.create(accountPayload);
    expect(account.getName()).toBe(accountPayload.name);
    expect(account.getNumber().getValue()).toBe(accountPayload.number);
    expect(account.getCurrency()).toBe(accountPayload.currency);
    expect(account.getBalance().getValue()).toBe(accountPayload.balance);
    expect(account.getStatus().getValue()).toBe(accountPayload.status);
    expect(account.getType()).toBe(accountPayload.type);
    expect(account.getHolderUuid().getValue()).toBe(accountPayload.holderUuid);
    expect(account.toObject()).toEqual(accountPayload);
  });
});
