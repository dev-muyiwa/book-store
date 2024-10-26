import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';
import { PaginationDto } from '../database/pagination.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@Inject() private readonly bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto, authorId: string) {
    return await this.bookRepository.createBook(createBookDto, authorId);
  }

  async findAll(paginationDto: PaginationDto, filterDto: FilterBookDto) {
    return await this.bookRepository.find(
      {
        ...(filterDto.author && {
          author: new Types.ObjectId(filterDto.author),
        }),
        ...(filterDto.genre && { genre: new Types.ObjectId(filterDto.genre) }),
      },
      paginationDto,
    );
  }

  async findOne(bookId: string) {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book.populate('author genre', '-password');
  }

  async update(bookId: string, updateBookDto: UpdateBookDto, authorId: string) {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (book.author.toString() !== authorId) {
      throw new ForbiddenException('You are not allowed to update this book');
    }

    return await this.bookRepository.updateBook(book.id, updateBookDto);
  }

  async remove(bookId: string, authorId: string) {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    if (book.author.toString() !== authorId) {
      throw new ForbiddenException('You are not allowed to delete this book');
    }

    return await this.bookRepository.deleteOne({ _id: book._id });
  }
}
