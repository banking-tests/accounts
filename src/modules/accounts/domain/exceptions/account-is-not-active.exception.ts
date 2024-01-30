export class AccountIsNotActiveException extends Error {
  constructor() {
    super('Account is not active');
  }
}
