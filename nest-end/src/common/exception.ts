import { HttpException, HttpStatus } from '@nestjs/common';

export class loginError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
