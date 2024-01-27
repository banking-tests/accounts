export class InvalidBalanceException extends Error {
  constructor(message: string) {
    super(message);
  }
}
