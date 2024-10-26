import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorDocument } from '../authors/entities/author.entity';
import { success } from '../core/util/response';
import { SkipAuthorization } from '../auth/guards/jwt.guard';
import { PaginationDto } from '../database/pagination.dto';
import { FilterBookDto, IdParam } from './dto/filter-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Req() req: Request, @Body() createBookDto: CreateBookDto) {
    const author = req.user as AuthorDocument;
    const newBook = await this.booksService.create(createBookDto, author.id);
    return success(newBook, 'book created');
  }

  @SkipAuthorization()
  @Get()
  async findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: FilterBookDto,
  ) {
    const books = await this.booksService.findAll(pagination, filters);
    return success(books, 'books fetched');
  }

  @SkipAuthorization()
  @Get(':id')
  async findOne(@Param() idParam: IdParam) {
    const book = await this.booksService.findOne(idParam.id);
    return success(book, 'book fetched');
  }

  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param() idParam: IdParam,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    const author = req.user as AuthorDocument;
    const updatedBook = await this.booksService.update(
      idParam.id,
      updateBookDto,
      author.id,
    );
    return success(updatedBook, 'book updated');
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Param() idParam: IdParam) {
    const author = req.user as AuthorDocument;
    const isDeleted = await this.booksService.remove(idParam.id, author.id);
    return success({ isDeleted }, 'book deleted');
  }
}
