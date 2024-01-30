import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class ResourceDocument extends Document {
  @Prop({ type: String, required: true, unique: true })
  public uuid: string;

  @Prop({ type: Boolean })
  public isActive?: boolean;

  @Prop({ type: Date })
  public deletedAt?: Date;

  @Prop({ type: Boolean, default: false })
  public isDeleted?: boolean;
}
