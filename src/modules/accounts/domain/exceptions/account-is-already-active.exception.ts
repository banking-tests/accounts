export class AccountIsAlreadyActiveException extends Error {
  constructor() {
    super('Account is already active');
  }
}
