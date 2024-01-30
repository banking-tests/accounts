import { Repository } from '@/core/application/repository.decorator';
import { BaseMemoryRepository } from '@/core/infrastructure/repositories/base.memory-repository';
import { AccountEntity } from '@/modules/accounts/domain/entities/account.entity';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { AccountModel } from '@/modules/accounts/infrastructure/persistence/database/models/account.model';
import { Inject } from '@nestjs/common';
import type Datastore from 'nedb-promises';

@Repository()
export class AccountsMemoryRepository extends BaseMemoryRepository<Account, AccountEntity> {
  constructor(
    @Inject(AccountModel.name)
    private readonly accountStore: Datastore<Account>,
  ) {
    super(accountStore, AccountEntity, { softDelete: true });
  }
}
