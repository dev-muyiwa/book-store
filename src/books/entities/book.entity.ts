import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Author } from '../../authors/entities/author.entity';
import { Genre } from './genre.entity';

@Schema({ timestamps: true, id: true })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: Author.name, required: true })
  author: Author;

  @Prop({ type: Types.ObjectId, ref: Genre.name })
  genre: Genre;

  @Prop({ required: false, type: Date, default: null })
  published_date?: Date;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass<Book>(Book);
