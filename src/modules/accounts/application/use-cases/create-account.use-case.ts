import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import {
  AccountsService,
  AccountsServiceToken,
} from '@/modules/accounts/domain/contracts/accounts.service';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { AccountPayload } from '@/modules/accounts/domain/types/account-payload.type';
import { generateAccountNumber } from '@/utils/generate-account-number';
import { Logger } from '@nestjs/common';
import { InjectUuidService, UuidService } from 'nestjs-uuid';

@UseCase()
export class CreateAccountUseCase implements Executable {
  constructor(
    @InjectService(AccountsServiceToken)
    private readonly accountsService: AccountsService,
    @InjectUuidService()
    private readonly uuidService: UuidService,
  ) {}

  public async execute(ctx: Context, payload: AccountPayload): Promise<Account> {
    const uuid = this.uuidService.generate();
    const accountNumber = generateAccountNumber();
    const accountName = `Account ${generateAccountNumber().slice(-4)}`;
    const account = await this.accountsService.create({
      ...payload,
      uuid,
      number: accountNumber,
      status: AccountStatus.ACTIVE,
      balance: 0,
      name: accountName,
    });

    Logger.log(`Account ${account.getUuid()} created`, ctx.requestId);

    return account.toObject();
  }
}
