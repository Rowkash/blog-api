import * as Swagger from '@nestjs/swagger';
import * as NestDecorators from '@nestjs/common';

import { CreateRoleDto } from './dto/role-create.dto';
import { RolesService } from './roles.service';

@Swagger.ApiTags('Roles')
@NestDecorators.Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  // ---------- Create Role ---------- //

  @Swagger.ApiOperation({ summary: 'Create Role' })
  @NestDecorators.Post()
  create(@NestDecorators.Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  // ---------- Get Role by Value ---------- //

  @Swagger.ApiOperation({ summary: 'Get Role by Value' })
  @NestDecorators.Get('/:value')
  getOne(@NestDecorators.Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
