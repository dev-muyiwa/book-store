import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Genre, GenreSchema } from './entities/genre.entity';
import { Book, BookSchema } from './entities/book.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { BookRepository } from './book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Genre.name, schema: GenreSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
})
export class BooksModule {}
