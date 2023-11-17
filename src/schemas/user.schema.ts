import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop()
  avatar: string;

  @Prop()
  title: string;

  @Prop()
  about: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isWriter: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
