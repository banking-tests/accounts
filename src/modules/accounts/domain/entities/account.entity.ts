import { BaseEntity } from '@/core/domain/base-entity';
import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { Status } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';
import { Account } from '@/modules/accounts/domain/interfaces/account';

export class AccountEntity extends BaseEntity<Account> {
  protected _name: string;
  protected _number: string;
  protected _currency: Currency;
  protected _balance: number;
  protected _status: Status;
  protected _type: AccountType;
  protected _holderUuid: string;

  constructor(props: Account) {
    super(props);
    this._name = props.name;
    this._number = props.number;
    this._currency = props.currency;
    this._balance = props.balance;
    this._status = props.status;
    this._type = props.type;
    this._holderUuid = props.holderUuid;
  }

  public static create(props: Account): AccountEntity {
    return new AccountEntity(props);
  }

  public getName(): string {
    return this._name;
  }

  public getNumber(): string {
    return this._number;
  }

  public getCurrency(): Currency {
    return this._currency;
  }

  public getBalance(): number {
    return this._balance;
  }

  public getStatus(): Status {
    return this._status;
  }

  public getType(): AccountType {
    return this._type;
  }

  public getHolderUuid(): string {
    return this._holderUuid;
  }

  public toObject(): Account {
    return {
      uuid: this._uuid,
      name: this._name,
      number: this._number,
      currency: this._currency,
      balance: this._balance,
      status: this._status,
      type: this._type,
      holderUuid: this._holderUuid,
    };
  }
}
