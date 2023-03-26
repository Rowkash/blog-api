import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Article } from 'src/articles/article.model';
import { ArticlesModule } from 'src/articles/articles.module';
import { User } from 'src/users/user.model';
import { Comment } from './comment.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([Article, User, Comment]),
    forwardRef(() => ArticlesModule),
    AuthModule,
  ],
})
export class CommentsModule {}
