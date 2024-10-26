import {
  IsDateString,
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isAfterDate', async: false })
class IsAfterDate implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    const compareValue = args.constraints[0];
    const currentDate =
      compareValue === 'now' ? new Date() : (args.object as any)[compareValue];

    return new Date(propertyValue) > new Date(currentDate);
  }

  defaultMessage(args: ValidationArguments) {
    const compareValue = args.constraints[0];
    return `${args.property} must be after ${compareValue === 'now' ? 'the current date' : compareValue}`;
  }
}

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  readonly title: string;

  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description is required' })
  readonly description: string;

  @IsString({ message: 'Genre must be a string' })
  @IsNotEmpty({ message: 'Genre is required' })
  readonly genre: string;

  @IsDateString({ strict: true }, { message: 'Invalid date format' })
  @Validate(IsAfterDate, ['now'], {
    message: 'Published date must be after the current date',
  })
  readonly published_date: Date;
}
