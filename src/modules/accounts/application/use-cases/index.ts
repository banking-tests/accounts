import { ActivateAccountUseCase } from '@/modules/accounts/application/use-cases/activate-account.use-case';
import { CloseAccountUseCase } from '@/modules/accounts/application/use-cases/close-account.use-case';
import { CreateAccountUseCase } from '@/modules/accounts/application/use-cases/create-account.use-case';
import { GetAccountUseCase } from '@/modules/accounts/application/use-cases/get-account.use-case';
import { LockAccountUseCase } from '@/modules/accounts/application/use-cases/lock-account.use-case';
import { UpdateBalanceUseCase } from '@/modules/accounts/application/use-cases/update-balance.use-case';

export const useCases = [
  GetAccountUseCase,
  CreateAccountUseCase,
  UpdateBalanceUseCase,
  LockAccountUseCase,
  CloseAccountUseCase,
  ActivateAccountUseCase,
];
