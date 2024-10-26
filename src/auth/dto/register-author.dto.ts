import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterAuthorDtoInput {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsString({ message: 'Bio must be a string' })
  @IsNotEmpty({ message: 'Bio is required' })
  readonly bio: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
