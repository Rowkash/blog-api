import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

import { UserRoles } from 'src/roles/user-roles.model';
import { User } from './users/user.model';
import { Role } from './roles/role.model';
import { Article } from './articles/article.model';
import { Comment } from './comments/comment.model';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { ArticlesModule } from './articles/articles.module';
import { FilesModule } from './files/files.module';
import { CommentsModule } from './comments/comments.module';

import { CheckArticleMiddleware } from './middleware/check-article.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      models: [User, Role, UserRoles, Article, Comment],
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    ArticlesModule,
    FilesModule,
    CommentsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/');
    consumer.apply(CheckArticleMiddleware).forRoutes('articles/:articleId');
  }
}
