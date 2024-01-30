import { BaseEntity } from '@/core/domain/base-entity';
import { Uuid } from '@/core/domain/value-objects/uuid.value-object';
import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';
import { AccountBalanceIsNotZero } from '@/modules/accounts/domain/exceptions/account-balance-is-not-zero';
import { AccountIsNotActiveException } from '@/modules/accounts/domain/exceptions/account-is-not-active.exception';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { AccountNumber } from '@/modules/accounts/domain/value-objects/account-number.value-object';
import { Balance } from '@/modules/accounts/domain/value-objects/balance.value-object';
import { Status } from '@/modules/accounts/domain/value-objects/status.value-object';

export class AccountEntity extends BaseEntity<Account> {
  protected _name: string;
  protected _number: AccountNumber;
  protected _currency: Currency;
  protected _balance: Balance;
  protected _status: Status;
  protected _type: AccountType;
  protected _holderUuid: Uuid;

  constructor(props: Account) {
    super(props);
    this._name = props.name;
    this._number = new AccountNumber(props.number);
    this._currency = props.currency;
    this._balance = new Balance(props.balance);
    this._status = new Status(props.status);
    this._type = props.type;
    this._holderUuid = new Uuid(props.holderUuid);
  }

  public static create(props: Account): AccountEntity {
    return new AccountEntity(props);
  }

  public getUuid(): string {
    return this._uuid;
  }

  public getName(): string {
    return this._name;
  }

  public getNumber(): AccountNumber {
    return this._number;
  }

  public getCurrency(): Currency {
    return this._currency;
  }

  public getBalance(): Balance {
    return this._balance;
  }

  public getStatus(): Status {
    return this._status;
  }

  public getType(): AccountType {
    return this._type;
  }

  public getHolderUuid(): Uuid {
    return this._holderUuid;
  }

  public isClosed(): boolean {
    return this._status.getValue() === AccountStatus.CLOSED;
  }

  public isActive(): boolean {
    return this._status.getValue() === AccountStatus.ACTIVE;
  }

  public isLocked(): boolean {
    return this._status.getValue() === AccountStatus.LOCKED;
  }

  public isSavings(): boolean {
    return this._type === AccountType.SAVINGS;
  }

  public isChecking(): boolean {
    return this._type === AccountType.CHECKING;
  }

  public isPayroll(): boolean {
    return this._type === AccountType.PAYROLL;
  }

  public isDebit(): boolean {
    return this._type === AccountType.DEBIT;
  }

  public lock(): void {
    this._status = new Status(AccountStatus.LOCKED);
  }

  public activate(): void {
    this._status = new Status(AccountStatus.ACTIVE);
  }

  public close(): void {
    if (this._balance.getValue() !== 0) {
      throw new AccountBalanceIsNotZero('Account balance must be zero');
    }
    this._status = new Status(AccountStatus.CLOSED);
  }

  public updateBalance(balance: Balance): void {
    if (this.isClosed()) {
      throw new AccountIsNotActiveException();
    }
    this._balance = balance;
  }

  public toObject(): Account {
    return {
      uuid: this._uuid,
      name: this._name,
      number: this._number.getValue(),
      currency: this._currency,
      balance: this._balance.getValue(),
      status: this._status.getValue(),
      type: this._type,
      holderUuid: this._holderUuid.getValue(),
    };
  }
}
