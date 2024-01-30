import { InvalidAccountNumberException } from '@/modules/accounts/domain/exceptions/invalid-account-number.exception';
import { AccountNumber } from '@/modules/accounts/domain/value-objects/account-number.value-object';

describe('AccountNumberValueObject', () => {
  it('should create a valid account number', () => {
    const accountNumber = new AccountNumber('123456789012345678');
    expect(accountNumber).toBeDefined();
    expect(accountNumber.getValue()).toBe('123456789012345678');
  });

  it('should throw an InvalidAccountNumberException if the account number is invalid', () => {
    expect.assertions(1);
    try {
      expect(new AccountNumber('12345678901234567'));
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidAccountNumberException);
    }
  });

  it('should compare two account numbers', () => {
    const accountNumber1 = new AccountNumber('123456789012345678');
    const accountNumber2 = new AccountNumber('123456789012345678');
    expect(accountNumber1.isEqual(accountNumber2)).toBeTruthy();
  });
});
