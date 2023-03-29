import * as NestDecorators from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { User } from './user.model';
import { BanUserDto, ChangeRoleDto } from './dto/user.dto';

@Swagger.ApiTags('Users')
@Swagger.ApiBearerAuth()
@NestDecorators.Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // ---------- Get All Users ---------- //

  @Swagger.ApiOperation({ summary: 'Get all users' })
  @Swagger.ApiOkResponse({ type: [User] })
  @Swagger.ApiForbiddenResponse({ description: 'Forbidden' })
  @Roles('USER')
  @NestDecorators.UseGuards(RoleGuard)
  @NestDecorators.Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  // ---------- Add Role To User ---------- //

  @Swagger.ApiOperation({ summary: 'Add role to User' })
  @Swagger.ApiOkResponse()
  @NestDecorators.UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @NestDecorators.UseGuards(RoleGuard)
  @NestDecorators.Post('/role')
  getRole(@NestDecorators.Body() dto: ChangeRoleDto) {
    return this.userService.getRole(dto);
  }

  // ---------- Remove Role From User ---------- //

  @Swagger.ApiOperation({ summary: 'Remove role from User' })
  @Swagger.ApiOkResponse()
  @NestDecorators.UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @NestDecorators.UseGuards(RoleGuard)
  @NestDecorators.Delete('/role')
  removeRole(@NestDecorators.Body() dto: ChangeRoleDto) {
    return this.userService.removeRole(dto);
  }

  // ---------- Ban User ---------- //

  @Swagger.ApiOperation({ summary: 'Ban User' })
  @Swagger.ApiOkResponse({ type: User })
  @Roles('ADMIN')
  @NestDecorators.UseGuards(RoleGuard)
  @NestDecorators.Post('/ban')
  ban(@NestDecorators.Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
