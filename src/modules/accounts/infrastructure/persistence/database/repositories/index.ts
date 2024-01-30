import { AccountsRepositoryToken } from '@/modules/accounts/domain/contracts/accounts.repository';
import { AccountsDatabaseRepository } from '@/modules/accounts/infrastructure/persistence/database/repositories/accounts.database.repository';
import { Provider } from '@nestjs/common';

export const AccountsRepository: Provider = {
  provide: AccountsRepositoryToken,
  useClass: AccountsDatabaseRepository,
};
