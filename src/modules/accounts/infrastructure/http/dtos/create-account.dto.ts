import { Currency } from '@/modules/accounts/domain/enums/currency.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty()
  @IsEnum(Currency)
  public readonly currency: Currency;

  @ApiProperty()
  @IsEnum(AccountType)
  public readonly type: AccountType;

  @ApiProperty()
  @IsUUID()
  public readonly holderUuid: string;
}
