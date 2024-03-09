import { Controller } from '@nestjs/common';
import { RefresTokenService } from './refres-token.service';

@Controller('refres-token')
export class RefresTokenController {
  constructor(private readonly refresTokenService: RefresTokenService) {}
}
