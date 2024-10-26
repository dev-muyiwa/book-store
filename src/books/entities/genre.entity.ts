import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Genre {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, default: null })
  description?: string;
}

export type GenreDocument = Genre & Document;

export const GenreSchema = SchemaFactory.createForClass<Genre>(Genre);
