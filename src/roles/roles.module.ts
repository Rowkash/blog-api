import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { User } from 'src/users/user.model';
import { Role } from './role.model';
import { UserRoles } from './user-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([User, Role, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
