import { Crud } from '@/core/domain/crud.interface';
import { AccountEntity } from '../entities/account.entity';
import { Account } from '../interfaces/account.interface';

export const AccountsRepositoryToken = 'AccountsRepository';

export interface AccountsRepository extends Crud<Account, AccountEntity> {}
