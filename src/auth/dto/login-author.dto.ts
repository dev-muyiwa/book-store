import { RegisterAuthorDtoInput } from './register-author.dto';
import { PickType } from '@nestjs/mapped-types';

export class LoginAuthorDtoInput extends PickType(RegisterAuthorDtoInput, [
  'name',
  'password',
] as const) {}
