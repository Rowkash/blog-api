import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './user.model';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // ---------- Create User ---------- //

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    description: 'Created user object as response',
  })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  // ---------- Get All Users ---------- //

  @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({ status: 200, type: [User] })
  @ApiCreatedResponse()
  // @ApiCreatedResponse({ type: User })
  @Roles('USER')
  @UseGuards(RoleGuard)
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  // ---------- Add Role To User ---------- //

  @UsePipes(ValidationPipe)
  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post('/role')
  getRole(@Body() dto: AddRoleDto) {
    return this.userService.getRole(dto);
  }

  // ---------- Remove Role From User ---------- //

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Delete('/role')
  removeRole(@Body() dto: AddRoleDto) {
    return this.userService.removeRole(dto);
  }

  // ---------- Ban User ---------- //

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.userService.ban(dto);
  }
}
