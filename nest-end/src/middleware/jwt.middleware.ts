import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import {jwtConstants} from "../api/auth/constants";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming JWT is sent in Authorization header
    if (token) {
      try {
        const decodedToken = jwt.verify(token, jwtConstants.secret);
        req.user ={
          userId:decodedToken.sub,
          // @ts-ignore
          nickname:decodedToken.nickname
        }// Store the decoded token in req.user
      } catch (error) {
        // Handle token verification error
      }
    }

    next();
  }
}
