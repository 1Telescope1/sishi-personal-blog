import { Controller } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';

@Controller('refres-token')
export class RefresTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) { }
}
