import { BaseRepository } from '../database/base.repository';
import { Book, BookDocument } from './entities/book.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { Genre, GenreDocument } from './entities/genre.entity';
import { UpdateBookDto } from './dto/update-book.dto';

export class BookRepository extends BaseRepository<BookDocument> {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(Genre.name) private readonly genreModel: Model<GenreDocument>,
  ) {
    super(bookModel);
  }

  async createBook(
    dto: CreateBookDto,
    authorId: string,
  ): Promise<BookDocument> {
    let genre = await this.genreModel.findOne({ name: dto.genre });
    if (!genre) {
      genre = await this.genreModel.create({ name: dto.genre });
    }

    return this.bookModel.create({
      title: dto.title,
      description: dto.description,
      published_date: dto.published_date,
      genre: genre._id,
      author: new Types.ObjectId(authorId),
    });
  }

  async updateBook(bookId: string, dto: UpdateBookDto): Promise<BookDocument> {
    let genreId = null;
    if (dto.genre) {
      let genre = await this.genreModel.findOne({ name: dto.genre });
      if (!genre) {
        genre = await this.genreModel.create({ name: dto.genre });
        genreId = genre._id;
      }
    }

    return this.bookModel.findOneAndUpdate(
      { _id: bookId },
      {
        ...dto,
        ...(genreId && { genre: genreId }),
      },
      { new: true },
    );
  }
}
