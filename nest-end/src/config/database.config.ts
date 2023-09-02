import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export default async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: configService.get<string>('DATABASE_HOST', 'localhost'), // 默认值：localhost
  port: configService.get<number>('DATABASE_PORT', 3306), // 默认值：3306
  username: configService.get<string>('DATABASE_USERNAME', 'root'), // 默认值：root
  password: configService.get<string>('DATABASE_PASSWORD', '123456'), // 默认值：password
  database: configService.get<string>('DATABASE_NAME', 'aurora'), // 默认值：mydb
  // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
  entities: [__dirname + '/**/**/*.entity{.ts,.js}'], //实体文件
  retryDelay: 500, //重试连接数据库间隔
  retryAttempts: 10, //重试连接数据库的次数
  autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
  extra:{
    connectionLimit: 10,
    idleTimeoutMillis: 30000,
    connectTimeout: 10000
  }
});
