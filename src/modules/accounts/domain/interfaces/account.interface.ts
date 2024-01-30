import { ResourceProps } from '@/core/domain/interfaces/resource-props.interface';
import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';

export interface Account extends ResourceProps {
  name: string;
  number: string;
  currency: Currency;
  balance: number;
  status: AccountStatus;
  type: AccountType;
  holderUuid: string;
}
