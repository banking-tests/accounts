import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import {
  AccountsService,
  AccountsServiceToken,
} from '@/modules/accounts/domain/contracts/accounts.service';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountNotFoundException } from '@/modules/accounts/domain/exceptions/account-not-found.exception';
import { InvalidStatusTransition } from '@/modules/accounts/domain/exceptions/invalid-status-transition.exception';
import { statusStateMachine } from '@/modules/accounts/domain/states-machines/status.state-machine';

@UseCase()
export class ActivateAccountUseCase implements Executable {
  constructor(
    @InjectService(AccountsServiceToken)
    private readonly accountsService: AccountsService,
  ) {}

  public async execute(ctx: Context, uuid: string): Promise<{ status: AccountStatus }> {
    const account = await this.accountsService.findOne({ uuid });

    if (!account) {
      throw new AccountNotFoundException(`Account ${uuid} not found`);
    }

    const accountStatus = account.getStatus().getValue();

    const canTransition = statusStateMachine.canTransition(accountStatus, AccountStatus.ACTIVE);

    if (!canTransition) {
      throw new InvalidStatusTransition(
        `Invalid transition from ${accountStatus} to ${AccountStatus.ACTIVE}`,
      );
    }

    account.activate();

    const updatedAccount = await this.accountsService.update(
      { uuid },
      {
        status: account.getStatus().getValue(),
      },
    );

    return { status: updatedAccount.getStatus().getValue() };
  }
}
