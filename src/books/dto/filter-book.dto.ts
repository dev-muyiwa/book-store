import { Type } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  @Type(() => String)
  @IsMongoId({ message: 'Invalid author ID' })
  readonly author?: string;

  @IsOptional()
  @Type(() => String)
  @IsMongoId({ message: 'Invalid genre ID' })
  readonly genre?: string;
}

export class IdParam {
  @IsMongoId({ message: 'Invalid ID' })
  id: string;
}
