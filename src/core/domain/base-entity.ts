import { Entity } from '@/core/domain/entity';
import { BaseProps } from '@/core/domain/interfaces/base-props.interface';

export abstract class BaseEntity<T extends BaseProps> extends Entity<T> {
  protected _data: T;
  protected _uuid: string;

  protected constructor(data: T) {
    super(data);
    this._data = data;
    this._uuid = data.uuid;
  }

  public get uuid(): string {
    return this._uuid;
  }
}

export type PayloadBaseProps = Pick<BaseProps, 'uuid'>;
