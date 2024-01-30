import { ValueObject } from '@/core/domain/value-object';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';

export class Status extends ValueObject<AccountStatus> {
  constructor(value: AccountStatus) {
    super(value);
  }

  public isValid(value: string): boolean {
    return Object.values(AccountStatus).includes(value as AccountStatus);
  }
}
