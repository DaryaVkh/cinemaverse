import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ReviewType } from './films.models';

@Schema({ collection: 'comments', timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: ReviewType;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, default: 0 })
  positiveRating: number;

  @Prop({ required: true, default: 0 })
  negativeRating: number;

  @Prop({ required: true })
  kinopoiskId: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
