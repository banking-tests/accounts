import { generateAccountNumber } from '@/utils/generate-account-number';

describe('generateAccountNumber', () => {
  it('should generate a random account number', () => {
    expect(generateAccountNumber()).toMatch(/^\d{18}$/);
  });

  it('should generate a different account number each time', () => {
    const accountNumbers = Array.from(Array(100000).keys()).map(() => generateAccountNumber());
    expect(accountNumbers).toEqual(Array.from(new Set(accountNumbers)));
  });
});
