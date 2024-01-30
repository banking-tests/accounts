import { StateMachine } from '@/core/domain/state-machine';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';

export const statusStateMachine = new StateMachine<AccountStatus>({
  [AccountStatus.ACTIVE]: [AccountStatus.LOCKED, AccountStatus.CLOSED],
  [AccountStatus.LOCKED]: [AccountStatus.ACTIVE, AccountStatus.CLOSED],
  [AccountStatus.CLOSED]: [],
});
