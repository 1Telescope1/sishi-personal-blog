import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { RefresTokenController } from './refresh-token.controller';

@Module({
  controllers: [RefresTokenController],
  providers: [RefreshTokenService],
  exports: [RefreshTokenService]
})
export class RefresTokenModule { }
