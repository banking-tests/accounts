import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateBalanceDto {
  @ApiProperty({ type: Number, example: 100 })
  @IsNumber()
  public readonly balance: number;
}
