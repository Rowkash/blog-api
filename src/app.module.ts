import { UserRoles } from 'src/roles/user-roles.model';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.model';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/article.model';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Comment } from './comments/comment.model';
import { CommentsModule } from './comments/comments.module';
import { CheckArticleMiddleware } from './middleware/article.middleware';

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
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // ---------- Check Article Id Middleware ---------- //

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckArticleMiddleware).forRoutes('articles/:articleId');
  }
}
