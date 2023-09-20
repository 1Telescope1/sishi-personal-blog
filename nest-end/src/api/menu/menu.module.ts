import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import {Share} from "../../utils/share";

@Module({
  imports:[TypeOrmModule.forFeature([Menu]),Share],
  controllers: [MenuController],
  providers: [MenuService],
  exports:[MenuService]
})
export class MenuModule {}
