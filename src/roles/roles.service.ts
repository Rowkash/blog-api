import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/role-create.dto';
import { Role } from './role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  // ---------- Create Role ---------- //

  async createRole(roleDto: CreateRoleDto): Promise<Role> {
    const role = await this.rolesRepository.create(roleDto);
    return role;
  }

  // ---------- Get Role By Value ---------- //

  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { value } });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
}
