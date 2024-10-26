import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, id: true })
export class Author {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  bio: string;
}

export type AuthorDocument = Author & Document;

export const AuthorSchema = SchemaFactory.createForClass<Author>(Author);
