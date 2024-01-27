import { AccountEntity } from '@/modules/accounts/domain/entities/account.entity';
import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { Status } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';

describe('AccountEntity', () => {
  it('should have static create method', () => {
    expect(AccountEntity.create).toBeDefined();
  });

  it('should create an account entity', () => {
    const accountPayload = {
      uuid: 'e05e6dd7-4b70-418a-a4a9-225a31443b40',
      name: 'Test account',
      number: '1234567890',
      currency: Currency.USD,
      balance: 0,
      status: Status.ACTIVE,
      type: AccountType.DEBIT,
      holderUuid: '82962716-9bfa-4e47-a768-4f6ea320eedc',
    };
    const account = AccountEntity.create(accountPayload);
    expect(account.getName()).toBe(accountPayload.name);
    expect(account.getNumber()).toBe(accountPayload.number);
    expect(account.getCurrency()).toBe(accountPayload.currency);
    expect(account.getBalance()).toBe(accountPayload.balance);
    expect(account.getStatus()).toBe(accountPayload.status);
    expect(account.getType()).toBe(accountPayload.type);
    expect(account.getHolderUuid()).toBe(accountPayload.holderUuid);
    expect(account.toObject()).toEqual(accountPayload);
  });
});
