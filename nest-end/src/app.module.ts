import { Module, NestModule, MiddlewareConsumer,RequestMethod  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutModule } from './api/about/about.module';
import { TalkModule } from './api/talk/talk.module';
import { UserInfoModule } from './api/user-info/user-info.module';
import { UserRoleModule } from './api/user-role/user-role.module';
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
import {LoggerMiddleware} from "./middleware/logger.middleware";
import {LoggerService} from "./api/logger/logger.service";
import {WebsocketGateway} from "./gateway/websocket.gatway";
import { ChatModule } from './api/chat/chat.module';
import { ExceptionLogModule } from './api/exception-log/exception-log.module';
import {ExceptionLogService} from "./api/exception-log/exception-log.service";


@Module({
  imports: [
  // TypeOrmModule.forRoot({
  //     type: 'mysql', //数据库类型
  //     username: 'root', //账号
  //     password: '123456', //密码
  //     host: 'localhost', //host
  //     port: 3306, //
  //     database: 'aurora', //库名
  //     entities: [__dirname + '/**/**/*.entity{.ts,.js}'], //实体文件
  //     // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
  //     retryDelay: 500, //重试连接数据库间隔
  //     retryAttempts: 10, //重试连接数据库的次数
  //     autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  //   }),
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'blog_db', //账号
      password: '123456', //密码
      host: '43.138.109.120', //host
      port: 3306, //
      database: 'blog_db', //库名
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'], //实体文件
      // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
      extra:{
        connectionLimit: 10,
        idleTimeoutMillis: 30000,
        connectTimeout: 10000
      }
    }),
    AboutModule,
    TalkModule,
    UserInfoModule,
    UserRoleModule,
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
    WebsocketGateway,
    ChatModule,
    ExceptionLogModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*'); //解析请求的token
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.POST},{ path: '*', method: RequestMethod.DELETE});
  }
}
