import { ResourceDocument } from '@/core/infrastructure/models/resource-document';
import { AccountStatus } from '@/modules/accounts/domain/enums/status.enum';
import { AccountType } from '@/modules/accounts/domain/enums/type.enum';
import { ModelDefinition, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'accounts', timestamps: true, autoCreate: true, autoIndex: true })
export class AccountModel extends ResourceDocument {
  @Prop({ type: String })
  public name: string;

  @Prop({ type: String })
  public number: string;

  @Prop({ type: String })
  public currency: string;

  @Prop({ type: Number })
  public balance: number;

  @Prop({ type: String })
  public status: AccountStatus;

  @Prop({ type: String })
  public type: AccountType;

  @Prop({ type: String })
  public holderUuid: string;
}

export const AccountSchema = SchemaFactory.createForClass(AccountModel);

export const Accounts: ModelDefinition = {
  name: AccountModel.name,
  schema: AccountSchema,
};
