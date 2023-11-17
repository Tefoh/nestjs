import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
