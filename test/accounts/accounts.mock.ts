import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';

export const accountsMock: Account[] = [
  {
    uuid: '569086ba-2b8d-4e9e-8cc9-0e55002faec4',
    name: 'Super Payroll',
    currency: Currency.MXN,
    balance: 0,
    status: AccountStatus.ACTIVE,
    type: AccountType.PAYROLL,
    holderUuid: '569086ba-2b8d-4e9e-8cc9-0e55002faec5',
    number: '123456789012345678',
  },
  {
    uuid: '569086ba-2b8d-4e9e-8cc9-0e55002faec5',
    name: 'Super Savings',
    currency: Currency.USD,
    balance: 100,
    status: AccountStatus.ACTIVE,
    type: AccountType.SAVINGS,
    holderUuid: '569086ba-2b8d-4e9e-8cc9-0e55002faec5',
    number: '123456789012345679',
  },
  {
    uuid: '569086ba-2b8d-4e9e-8cc9-0e55002faec6',
    name: 'Super Checking',
    currency: Currency.USD,
    balance: 100,
    status: AccountStatus.ACTIVE,
    type: AccountType.CHECKING,
    holderUuid: '569086ba-2b8d-4e9e-8cc9-0e55002faec5',
    number: '123456789012345670',
  },
];
