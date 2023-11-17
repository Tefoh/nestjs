import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true })
export class Tag {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  slug: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
