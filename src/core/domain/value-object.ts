export abstract class ValueObject<T> {
  protected _value: T;

  constructor(value: T) {
    this._value = value;
  }

  public getValue(): T {
    return this._value;
  }

  public equals(valueObject: ValueObject<T>): boolean {
    return this._value === valueObject.getValue();
  }

  public abstract validate(): void;
}
