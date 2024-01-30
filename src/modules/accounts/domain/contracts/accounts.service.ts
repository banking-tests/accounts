import { Crud } from '@/core/domain/crud.interface';
import { AccountEntity } from '../entities/account.entity';
import { Account } from '../interfaces/account.interface';

export const AccountsServiceToken = 'AccountsService';

export interface AccountsService extends Crud<Account, AccountEntity> {}
