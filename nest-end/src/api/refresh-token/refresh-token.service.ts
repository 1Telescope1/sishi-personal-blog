// jwt.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class RefreshTokenService {
  generateToken(payload: any): string {
    const token = jwt.sign(payload, jwtConstants.refreshSecret, { expiresIn: '7d' });
    return token;
  }

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, jwtConstants.refreshSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
