import * as NestDecorators from '@nestjs/common';
import * as Swagger from '@nestjs/swagger';

import { UsersService } from './users.service';
import { Roles, EnumRole } from 'src/decorators/role-auth.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { User } from './user.model';
import { BanUserDto, ChangeRoleDto } from './dto/user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Swagger.ApiTags('Users')
@Swagger.ApiBearerAuth()
@NestDecorators.Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // ---------- Get All Users ---------- //

  @Swagger.ApiOperation({ summary: 'Get all users' })
  @Swagger.ApiOkResponse({ type: [User] })
  @Swagger.ApiForbiddenResponse({ description: 'Forbidden' })
  @NestDecorators.UseGuards(AuthGuard)
  @Roles(EnumRole.ADMIN)
  @NestDecorators.Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  // ---------- Add Role To User ---------- //

  @Swagger.ApiOperation({ summary: 'Add role to User' })
  @Swagger.ApiOkResponse()
  @NestDecorators.UsePipes(ValidationPipe)
  @NestDecorators.UseGuards(AuthGuard)
  @Roles(EnumRole.ADMIN)
  @NestDecorators.Post('/role')
  getRole(@NestDecorators.Body() dto: ChangeRoleDto) {
    return this.userService.getRole(dto);
  }

  // ---------- Remove Role From User ---------- //

  @Swagger.ApiOperation({ summary: 'Remove role from User' })
  @Swagger.ApiOkResponse()
  @NestDecorators.UseGuards(AuthGuard)
  @Roles(EnumRole.ADMIN)
  @NestDecorators.Delete('/role')
  removeRole(@NestDecorators.Body() dto: ChangeRoleDto) {
    return this.userService.removeRole(dto);
  }

  // ---------- Ban User ---------- //

  @Swagger.ApiOperation({ summary: 'Ban User' })
  @Swagger.ApiOkResponse({ type: User })
  @NestDecorators.UseGuards(AuthGuard)
  @Roles(EnumRole.ADMIN)
  @NestDecorators.Post('/ban')
  ban(@NestDecorators.Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
