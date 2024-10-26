import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthorDtoInput } from './dto/login-author.dto';
import { success } from '../core/util/response';
import { RegisterAuthorDtoInput } from './dto/register-author.dto';
import { SkipAuthorization } from './guards/jwt.guard';

@Controller('auth')
@SkipAuthorization()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() dtoInput: RegisterAuthorDtoInput) {
    const author = await this.authService.create(dtoInput);
    return success(author, 'author registered successfully.');
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body() dtoInput: LoginAuthorDtoInput) {
    const author = await this.authService.login(dtoInput);
    return success(author, 'author logged in successfully');
  }
}
