import { Module } from '@nestjs/common';
import { BackService } from './back.service';
import { BackController } from './back.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Back } from './entities/back.entity';
import { Share } from 'src/utils/share';

@Module({
  imports:[TypeOrmModule.forFeature([Back]),Share],
  controllers: [BackController],
  providers: [BackService],
  exports:[BackService]
})
export class BackModule {}
