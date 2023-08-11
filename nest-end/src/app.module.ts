import { Module } from '@nestjs/common';
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
import { LoginModule } from './api/login/login.module';
import { BlogModule } from './api/blog/blog.module';
import { MinioModule } from './api/minio/minio.module';
import { FileModule } from './api/file/file.module';
import { AuthModule } from './api/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '123456', //密码
      host: 'localhost', //host
      port: 3306, //
      database: 'aurora', //库名
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'], //实体文件
      // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql', //数据库类型
    //   username: 'blog_nest', //账号
    //   password: 'shenqundeng181X', //密码
    //   host: '43.143.107.88', //host
    //   port: 3306, //
    //   database: 'blog_nest', //库名
    //   entities: [__dirname + '/**/**/*.entity{.ts,.js}'], //实体文件
    //   // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
    //   retryDelay: 500, //重试连接数据库间隔
    //   retryAttempts: 10, //重试连接数据库的次数
    //   autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    // }),
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
    LoginModule,
    BlogModule,
    MinioModule,
    FileModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
