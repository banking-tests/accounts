import { Repository } from '@/core/application/repository.decorator';
import { BaseRepository } from '@/core/infrastructure/repositories/base.repository';
import { AccountEntity } from '@/modules/accounts/domain/entities/account.entity';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { AccountModel } from '@/modules/accounts/infrastructure/persistence/database/models/account.model';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

@Repository()
export class AccountsDatabaseRepository extends BaseRepository<Account, AccountEntity> {
  constructor(
    @InjectModel(AccountModel.name)
    private readonly accountModel: PaginateModel<AccountModel>,
  ) {
    super(accountModel, AccountEntity, { softDelete: true });
  }
}
