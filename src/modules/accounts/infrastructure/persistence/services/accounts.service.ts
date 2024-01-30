import { InjectRepository } from '@/core/application/inject-repository.decorator';
import { Service } from '@/core/application/service.decorator';
import { BaseService } from '@/core/infrastructure/services/base.service';
import {
  AccountsRepository,
  AccountsRepositoryToken,
} from '@/modules/accounts/domain/contracts/accounts.repository';
import { AccountEntity } from '@/modules/accounts/domain/entities/account.entity';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';

@Service()
export class AccountsService extends BaseService<Account, AccountEntity> {
  constructor(
    @InjectRepository(AccountsRepositoryToken)
    private readonly accountsRepository: AccountsRepository,
  ) {
    super(accountsRepository);
  }
}
