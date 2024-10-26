import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../database/base.repository';
import { Author, AuthorDocument } from './entities/author.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthorRepository extends BaseRepository<AuthorDocument> {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDocument>,
  ) {
    super(authorModel);
  }

  async exists(name: string): Promise<boolean> {
    return (await this.authorModel.exists({ name: name })) !== null;
  }
}
