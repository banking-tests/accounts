import { InvalidBalanceException } from '@/modules/accounts/domain/exceptions/invalid-balance.exception';
import { Balance } from '@/modules/accounts/domain/value-objects/balance.value-object';

describe('BalanceValueObject', () => {
  it('should initialize a balance value object', () => {
    const balance = new Balance(100);
    expect(balance).toBeInstanceOf(Balance);
    expect(balance.getValue()).toBe(100);
  });

  it('should throw an InvalidBalanceException exception if the initial value is not a number', () => {
    expect.assertions(1);
    try {
      expect(new Balance(NaN));
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidBalanceException);
    }
  });

  it('should compare two balance value objects', () => {
    const balance1 = new Balance(100);
    const balance2 = new Balance(100);
    expect(balance1.isEqual(balance2)).toBeTruthy();
  });
});
