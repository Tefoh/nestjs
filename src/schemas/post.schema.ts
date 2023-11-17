import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
import { Category } from './category.schema';
import { Tag } from './tag.schema';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: String, unique: true })
  slug: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  banner: string;

  @Prop({ required: true })
  shortUrl: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  writer: User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  })
  tags: Tag[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
