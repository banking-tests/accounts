import { useCases } from '@/modules/accounts/application/use-cases';
import { AccountsController } from '@/modules/accounts/infrastructure/http/controllers/accounts.controller';
import { Accounts } from '@/modules/accounts/infrastructure/persistence/database/models/account.model';
import { AccountsRepository } from '@/modules/accounts/infrastructure/persistence/database/repositories';
import { AccountsService } from '@/modules/accounts/infrastructure/persistence/services';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UuidModule } from 'nestjs-uuid';

@Module({
  imports: [MongooseModule.forFeature([Accounts]), UuidModule],
  providers: [AccountsService, AccountsRepository, ...useCases],
  controllers: [AccountsController],
})
export class AccountsModule {}
