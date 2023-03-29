import { HttpException, HttpStatus } from "@nestjs/common";

export function handleHttpError(error: Error) {
    throw new HttpException({
       status: HttpStatus.BAD_REQUEST,
       error: error.message,
     }, HttpStatus.BAD_REQUEST, {
       cause: error
     }
     );
  }