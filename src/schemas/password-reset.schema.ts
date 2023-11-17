import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PasswordResetDocument = PasswordReset & Document;

@Schema({ timestamps: true })
export class PasswordReset {
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;

  @Prop({ default: null, type: Date })
  expiredAt: Date;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);
