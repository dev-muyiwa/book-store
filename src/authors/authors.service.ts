import { Inject, Injectable } from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { RegisterAuthorDtoInput } from '../auth/dto/register-author.dto';

@Injectable()
export class AuthorsService {
  constructor(@Inject() private readonly authorRepository: AuthorRepository) {}

  async findOneByName(name: string) {
    return this.authorRepository.findOne({ name: name });
  }

  async exists(name: string): Promise<boolean> {
    return this.authorRepository.exists(name);
  }

  async create(registerAuthorInput: RegisterAuthorDtoInput) {
    const newAuthor = await this.authorRepository.create({
      name: registerAuthorInput.name,
      bio: registerAuthorInput.bio,
      password: registerAuthorInput.password,
    });

    newAuthor.password = undefined;

    return newAuthor;
  }
}
