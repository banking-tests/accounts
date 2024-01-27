export class CouldntUpdateClosedStatus extends Error {
  constructor() {
    super('Could not update closed status');
  }
}
