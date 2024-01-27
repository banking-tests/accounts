export class InvalidAccountNumberException extends Error {
  constructor(message: string) {
    super(message);
  }
}
