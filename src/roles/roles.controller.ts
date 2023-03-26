import { CreateRoleDto } from './dto/role-create.dto';
import { RolesService } from './roles.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  @Get('/:value')
  getOne(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
