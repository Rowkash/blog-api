import * as Swagger from '@nestjs/swagger';
import * as NestDecorators from '@nestjs/common';

import { CreateRoleDto } from './dto/role-create.dto';
import { RolesService } from './roles.service';
import { Role } from './role.model';
import { Roles, EnumRole } from 'src/decorators/role-auth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';

@Swagger.ApiTags('Roles')
@NestDecorators.Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  // ---------- Create Role ---------- //

  @Swagger.ApiOperation({ summary: 'Create Role' })
  @Swagger.ApiCreatedResponse({
    type: Role,
    description:
      'Successfully creating a role and getting a role object from the server',
  })
  @Swagger.ApiBadRequestResponse({
    description:
      'Unauthorized error response. If the client sends incorrect data for create a role',
  })
  @Swagger.ApiUnauthorizedResponse({
    description: 'If the client does not have permission to create a role',
  })
  @NestDecorators.UseGuards(AuthGuard)
  @Roles(EnumRole.ADMIN)
  @NestDecorators.Post()
  create(@NestDecorators.Body() roleDto: CreateRoleDto) {
    return this.roleService.createRole(roleDto);
  }

  // ---------- Get Role by Value ---------- //

  @Swagger.ApiOperation({ summary: 'Get Role by Value' })
  @Swagger.ApiOkResponse({
    type: Role,
    description: 'Getting a role object from the server',
  })
  @Swagger.ApiNotFoundResponse({ description: 'If role not found' })
  @NestDecorators.UseGuards(AuthGuard)
  @Roles(EnumRole.ADMIN)
  @NestDecorators.Get('/:value')
  getOne(@NestDecorators.Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
