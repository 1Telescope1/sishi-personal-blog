import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/filter';
import { ValidationPipe, HttpException } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Response } from './common/response'
import { ExceptionLogService } from "./api/exception-log/exception-log.service";
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });


  const exceptionLogService = app.get(ExceptionLogService);


  app.useGlobalFilters(new HttpFilter(exceptionLogService));
  app.useGlobalInterceptors(new Response());

  app.useGlobalPipes(new ValidationPipe());

  // helmet头部安全
  app.use(helmet());
  // rateLimit限流
  app.use(
    rateLimit({
      windowMs: 60 * 1000, //1分钟
      max: 1000, //允许每个ip在这windows时间里请求的次数
      handler: (req, res, next) => {
        const httpFilter = new HttpFilter(exceptionLogService);

        httpFilter.catch(new HttpException('当前请求过多，请稍后重试', 429), {
          switchToHttp: () => ({
            // @ts-ignore
            getRequest: () => req,
            // @ts-ignore
            getResponse: () => res,
          }),
        });
      },
    }),
  );

  // 使用session
  app.use(
    session({
      secret: 'sishi',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3000);

  console.log('Hello World By 四十')
}

bootstrap();
