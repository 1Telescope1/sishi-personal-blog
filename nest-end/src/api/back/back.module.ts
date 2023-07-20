import { Module } from '@nestjs/common';
import { BackService } from './back.service';
import { BackController } from './back.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Back } from './entities/back.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Back])],
  controllers: [BackController],
  providers: [BackService]
})
export class BackModule {}
