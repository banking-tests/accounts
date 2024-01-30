import { UseCase } from '@/core/application/case.decorator';
import { InjectService } from '@/core/application/inject-service.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import { Pagination } from '@/core/domain/pagination';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import {
  AccountsService,
  AccountsServiceToken,
} from '@/modules/accounts/domain/contracts/accounts.service';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { Logger } from '@nestjs/common';

@UseCase()
export class ListAccountsUseCase implements Executable {
  constructor(
    @InjectService(AccountsServiceToken)
    private readonly accountsService: AccountsService,
  ) {}

  public async execute(
    context: Context,
    search: string,
    filter: Json,
    options: QueryParsedOptions,
  ): Promise<Pagination<Account>> {
    Logger.log({ search, filter, options }, context.requestId);
    const result = await this.accountsService.paginate(filter, options);
    const nextPage = options.page < result.pages ? options.page + 1 : null;
    const prevPage = options.page > 1 ? result.page - 1 : null;
    return {
      docs: result.docs.map((account) => account.toObject()),
      total: result.total,
      limit: result.limit,
      page: options.page,
      pages: result.pages,
      prevPage: prevPage,
      nextPage: nextPage,
      offset: result.offset,
      hasMore: options.page < result.pages,
    };
  }
}
