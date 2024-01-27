import { Context } from '@/core/domain/interfaces/context.interface';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';
import { ActivateAccountUseCase } from '@/modules/accounts/application/use-cases/activate-account.use-case';
import { CloseAccountUseCase } from '@/modules/accounts/application/use-cases/close-account.use-case';
import { CreateAccountUseCase } from '@/modules/accounts/application/use-cases/create-account.use-case';
import { GetAccountUseCase } from '@/modules/accounts/application/use-cases/get-account.use-case';
import { LockAccountUseCase } from '@/modules/accounts/application/use-cases/lock-account.use-case';
import { UpdateBalanceUseCase } from '@/modules/accounts/application/use-cases/update-balance.use-case';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountBalanceIsNotZero } from '@/modules/accounts/domain/exceptions/account-balance-is-not-zero';
import { AccountIsNotActiveException } from '@/modules/accounts/domain/exceptions/account-is-not-active.exception';
import { AccountNotFoundException } from '@/modules/accounts/domain/exceptions/account-not-found.exception';
import { InvalidStatusTransition } from '@/modules/accounts/domain/exceptions/invalid-status-transition.exception';
import { Account } from '@/modules/accounts/domain/interfaces/account.interface';
import { CreateAccountDto } from '@/modules/accounts/infrastructure/http/dtos/create-account.dto';
import { UpdateBalanceDto } from '@/modules/accounts/infrastructure/http/dtos/update-balance.dto';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller({ version: '1', path: 'accounts' })
export class AccountsController {
  constructor(
    private readonly getAccountUseCase: GetAccountUseCase,
    private readonly createAccountUseCase: CreateAccountUseCase,
    private readonly updateBalanceUseCase: UpdateBalanceUseCase,
    private readonly lockAccountUseCase: LockAccountUseCase,
    private readonly closeAccountUseCase: CloseAccountUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
  ) {}

  @Get('/:uuid')
  public async getAccount(@Ctx() ctx: Context, @Param('uuid') uuid: string): Promise<Account> {
    try {
      return await this.getAccountUseCase.execute(ctx, uuid);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post('/')
  public async createAccount(
    @Ctx() ctx: Context,
    @Body() body: CreateAccountDto,
  ): Promise<Account> {
    try {
      return await this.createAccountUseCase.execute(ctx, body);
    } catch (error) {
      switch (error.constructor) {
        default: {
          throw new InternalServerErrorException();
        }
      }
    }
  }

  @Patch('/:uuid/balance')
  public async updateBalance(
    @Ctx() ctx: Context,
    @Param('uuid') uuid: string,
    @Body() payload: UpdateBalanceDto,
  ): Promise<{ balance: number }> {
    try {
      return await this.updateBalanceUseCase.execute(ctx, uuid, payload.balance);
    } catch (error) {
      switch (error.constructor) {
        case AccountIsNotActiveException: {
          throw new ConflictException(error.message);
        }
        case AccountNotFoundException: {
          throw new NotFoundException(error.message);
        }
        default: {
          throw new InternalServerErrorException(error.message);
        }
      }
    }
  }

  @Patch('/:uuid/lock')
  public async lockAccount(
    @Ctx() ctx: Context,
    @Param('uuid') uuid: string,
  ): Promise<{ status: AccountStatus }> {
    try {
      return await this.lockAccountUseCase.execute(ctx, uuid);
    } catch (error) {
      switch (error.constructor) {
        case AccountNotFoundException: {
          throw new NotFoundException(error.message);
        }
        case InvalidStatusTransition: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new InternalServerErrorException(error.message);
        }
      }
    }
  }

  @Patch('/:uuid/close')
  public async closeAccount(
    @Ctx() ctx: Context,
    @Param('uuid') uuid: string,
  ): Promise<{ status: AccountStatus }> {
    try {
      return await this.closeAccountUseCase.execute(ctx, uuid);
    } catch (error) {
      switch (error.constructor) {
        case AccountNotFoundException: {
          throw new NotFoundException(error.message);
        }
        case InvalidStatusTransition: {
          throw new ConflictException(error.message);
        }
        case AccountBalanceIsNotZero: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new InternalServerErrorException(error.message);
        }
      }
    }
  }

  @Patch('/:uuid/activate')
  public async activateAccount(
    @Ctx() ctx: Context,
    @Param('uuid') uuid: string,
  ): Promise<{ status: AccountStatus }> {
    try {
      return await this.activateAccountUseCase.execute(ctx, uuid);
    } catch (error) {
      switch (error.constructor) {
        case AccountNotFoundException: {
          throw new NotFoundException(error.message);
        }
        case InvalidStatusTransition: {
          throw new ConflictException(error.message);
        }
        default: {
          throw new InternalServerErrorException(error.message);
        }
      }
    }
  }
}
