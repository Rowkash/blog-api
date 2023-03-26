import { RolesModule } from './../roles/roles.module';
import { UserRoles } from './../roles/user-roles.model';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Role } from 'src/roles/role.model';
import { User } from './user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Article } from 'src/articles/article.model';
import { Comment } from 'src/comments/comment.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Article, Comment]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
