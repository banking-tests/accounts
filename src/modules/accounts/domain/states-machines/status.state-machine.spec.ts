import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { statusStateMachine } from '@/modules/accounts/domain/states-machines/status.state-machine';

describe('StatusStateMachine', () => {
  it('should transition from active to locked', () => {
    expect(
      statusStateMachine.canTransition(AccountStatus.ACTIVE, AccountStatus.LOCKED),
    ).toBeTruthy();
  });

  it('should transition from active to closed', () => {
    expect(
      statusStateMachine.canTransition(AccountStatus.ACTIVE, AccountStatus.CLOSED),
    ).toBeTruthy();
  });

  it('should transition from locked to active', () => {
    expect(
      statusStateMachine.canTransition(AccountStatus.LOCKED, AccountStatus.ACTIVE),
    ).toBeTruthy();
  });

  it('should transition from locked to closed', () => {
    expect(
      statusStateMachine.canTransition(AccountStatus.LOCKED, AccountStatus.CLOSED),
    ).toBeTruthy();
  });

  it('should fail transitioning from closed to active', () => {
    expect(
      statusStateMachine.canTransition(AccountStatus.CLOSED, AccountStatus.ACTIVE),
    ).toBeFalsy();
  });

  it('should fail transitioning from closed to locked', () => {
    expect(
      statusStateMachine.canTransition(AccountStatus.CLOSED, AccountStatus.LOCKED),
    ).toBeFalsy();
  });
});
