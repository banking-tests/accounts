import { Account } from '../interfaces/account.interface';

export type AccountPayload = Pick<Account, 'currency' | 'type' | 'holderUuid'>;
