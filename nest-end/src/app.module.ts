import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AboutModule } from './api/about/about.module';
import { TalkModule } from './api/talk/talk.module';
import { UserInfoModule } from './api/user-info/user-info.module';
import { CommentModule } from './api/comment/comment.module';
import { RoleModule } from './api/role/role.module';
import { RoleResourceModule } from './api/role-resource/role-resource.module';
import { RoleMenuModule } from './api/role-menu/role-menu.module';
import { MenuModule } from './api/menu/menu.module';
import { ResourceModule } from './api/resource/resource.module';
import { MessageModule } from './api/message/message.module';
import { TalkCommentModule } from './api/talk-comment/talk-comment.module';
import { TagModule } from './api/tag/tag.module';
import { ArticleModule } from './api/article/article.module';
import { BackModule } from './api/back/back.module';
import { FriendLinkModule } from './api/friend-link/friend-link.module';
import { BlogModule } from './api/blog/blog.module';
import { MinioModule } from './api/minio/minio.module';
import { FileModule } from './api/file/file.module';
import { AuthModule } from './api/auth/auth.module';
import { RedisModule } from './api/redis/redis.module';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { LoggerModule } from './api/logger/logger.module';
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { WebsocketModule } from "./gateway/websocket.module";
import { ChatModule } from './api/chat/chat.module';
import { ExceptionLogModule } from './api/exception-log/exception-log.module';
import { OperationLogModule } from './api/operation-log/operation-log.module';
import { ViewsModule } from './api/views/views.module';
import { RefresTokenModule } from './api/refresh-token/refresh-token.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST', 'localhost'), // 从环境变量获取，如果不存在则默认为 'localhost'
        port: configService.get<number>('DATABASE_PORT', 3306), // 从环境变量获取，如果不存在则默认为 3306
        username: configService.get<string>('DATABASE_USERNAME', 'root'), // 从环境变量获取，如果不存在则默认为 'root'
        password: configService.get<string>('DATABASE_PASSWORD', '123456'), // 从环境变量获取，如果不存在则默认为 '123456'
        database: configService.get<string>('DATABASE_NAME', 'sishi'), // 从环境变量获取，如果不存在则默认为 'aurora'
        entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
        retryDelay: 500,
        retryAttempts: 10,
        autoLoadEntities: true,
      }),
      inject: [ConfigService], // 注入 ConfigService 依赖
    }),
    AboutModule,
    TalkModule,
    UserInfoModule,
    CommentModule,
    RoleModule,
    RoleResourceModule,
    RoleMenuModule,
    MenuModule,
    ResourceModule,
    MessageModule,
    TalkCommentModule,
    TagModule,
    ArticleModule,
    BackModule,
    FriendLinkModule,
    BlogModule,
    MinioModule,
    FileModule,
    AuthModule,
    RedisModule,
    LoggerModule,
    WebsocketModule,
    ChatModule,
    ExceptionLogModule,
    OperationLogModule,
    ViewsModule,
    RefresTokenModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({ path: 'userinfo/self', method: RequestMethod.ALL }, {
      path: 'talkcomment',
      method: RequestMethod.ALL
    }, { path: 'comment', method: RequestMethod.ALL }); //解析请求的token
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.POST }, {
      path: '*',
      method: RequestMethod.DELETE
    });
  }
}
