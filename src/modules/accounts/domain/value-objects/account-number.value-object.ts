import { ValueObject } from '@/core/domain/value-object';
import { InvalidAccountNumberException } from '@/modules/accounts/domain/exceptions/invalid-account-number.exception';

export class AccountNumber extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  public isValid(value: string): boolean {
    if (!value?.match(/\d{18}/g)) {
      throw new InvalidAccountNumberException(`Account number must have 18 digits`);
    }

    return true;
  }
}
