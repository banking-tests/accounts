import { ValueObject } from '@/core/domain/value-object';
import { InvalidBalanceException } from '@/modules/accounts/domain/exceptions/invalid-balance.exception';

export class Balance extends ValueObject<number> {
  constructor(value: number) {
    super(value);
  }

  public isValid(value: number): boolean {
    if (Number.isNaN(value)) {
      throw new InvalidBalanceException('The balance must be a number');
    }

    return true;
  }
}
