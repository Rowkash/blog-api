import { CommentsModule } from './../comments/comments.module';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/user.model';
import { Comment } from '../comments/comment.model';
import { Article } from './article.model';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './article.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [
    SequelizeModule.forFeature([User, Article, Comment]),
    FilesModule,
    AuthModule,
    UsersModule,
    CommentsModule,
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}
