export class InvalidStatusTransition extends Error {
  constructor(message: string) {
    super(message);
  }
}
