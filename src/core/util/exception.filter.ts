import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { error } from './response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'internal server error';
    let errors = null;

    if (exception instanceof HttpException) {
      const formatValidationErrors = (errors: any[]): any[] => {
        return errors.map((err) => {
          return {
            path: err.property,
            message: Object.values(err.constraints)[0] as string,
          };
        });
      };
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        if (
          status === HttpStatus.BAD_REQUEST &&
          Array.isArray(exceptionResponse.message)
        ) {
          message = 'validation errors';
          errors = formatValidationErrors(exceptionResponse.message);
        } else {
          message =
            exceptionResponse.message ||
            exception.message ||
            'an error occurred';
        }
      }
    }

    console.log('exception', exception);

    const errorResponse = error(message, errors);

    response.status(status).json(errorResponse);
  }
}
