import { Provider } from '@nestjs/common';
import { AccountsService as AccountsProvider } from './accounts.service';

export const AccountsService: Provider = {
  provide: 'AccountsService',
  useClass: AccountsProvider,
};
