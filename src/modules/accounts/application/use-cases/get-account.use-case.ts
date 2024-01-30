import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import {
  AccountsService,
  AccountsServiceToken,
} from '@/modules/accounts/domain/contracts/accounts.service';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { Logger } from '@nestjs/common';
import { AccountNotFoundException } from '../../domain/exceptions/account-not-found.exception';

@UseCase()
export class GetAccountUseCase implements Executable {
  constructor(
    @InjectService(AccountsServiceToken)
    private readonly accountsService: AccountsService,
  ) {}

  public async execute(ctx: Context, uuid: string): Promise<Account> {
    const account = await this.accountsService.findOne({ uuid });

    if (!account) {
      Logger.log(`Account ${uuid} not found`, ctx.requestId);
      throw new AccountNotFoundException(`Account ${uuid} not found`);
    }

    Logger.log(`Account ${account.getUuid()} found`, ctx.requestId);
    return account.toObject();
  }
}
