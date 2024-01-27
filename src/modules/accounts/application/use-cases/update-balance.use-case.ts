import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import {
  AccountsService,
  AccountsServiceToken,
} from '@/modules/accounts/domain/contracts/accounts.service';
import { AccountNotFoundException } from '@/modules/accounts/domain/exceptions/account-not-found.exception';
import { Balance } from '@/modules/accounts/domain/value-objects/balance.value-object';

@UseCase()
export class UpdateBalanceUseCase implements Executable {
  constructor(
    @InjectService(AccountsServiceToken)
    private readonly accountsService: AccountsService,
  ) {}

  public async execute(
    ctx: Context,
    uuid: string,
    balance: number,
  ): Promise<{ balance: number }> {
    const account = await this.accountsService.findOne({ uuid });

    if (!account) {
      throw new AccountNotFoundException(`Account ${uuid} not found`);
    }

    account.updateBalance(new Balance(balance));

    const updatedAccount = await this.accountsService.update(
      { uuid },
      {
        balance: account.getBalance().getValue(),
      },
    );

    return { balance: updatedAccount.getBalance().getValue() };
  }
}
