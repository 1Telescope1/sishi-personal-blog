import { HttpException, HttpStatus } from '@nestjs/common';

export class loginError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class registerError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}

export class tokenError extends HttpException {
  constructor(message:string) {
    super(message,HttpStatus.EXPECTATION_FAILED);
  }
}

export class resourcePermission extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
