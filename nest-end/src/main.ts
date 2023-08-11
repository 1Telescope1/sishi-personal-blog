import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Response } from './common/response';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { usePipe } from './pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new Response)
  app.useGlobalFilters(new HttpFilter)
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
