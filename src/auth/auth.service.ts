import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthorDtoInput } from './dto/register-author.dto';
import { LoginAuthorDtoInput } from './dto/login-author.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly authorsService: AuthorsService,
    @Inject() private readonly jwtService: JwtService,
  ) {}

  async create(input: RegisterAuthorDtoInput) {
    const exists = await this.authorsService.exists(input.name);
    if (exists) {
      throw new BadRequestException('An account with this name already exists');
    }

    const newAuthor = await this.authorsService.create(input);

    return {
      ...newAuthor.toJSON(),
      accessToken: this.jwtService.sign(
        { name: newAuthor.name },
        {
          subject: newAuthor.id,
        },
      ),
    };
  }

  async login(input: LoginAuthorDtoInput) {
    const existingAuthor = await this.authorsService.findOneByName(input.name);
    if (!existingAuthor) {
      throw new BadRequestException('Invalid login credentials');
    }
    const isPasswordValid = await bcrypt.compare(
      input.password,
      existingAuthor.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid login credentials');
    }
    existingAuthor.password = undefined;

    return {
      ...existingAuthor.toJSON(),
      accessToken: this.jwtService.sign(
        { name: existingAuthor.name },
        {
          subject: existingAuthor.id,
        },
      ),
    };
  }
}
