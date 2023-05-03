import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { BanUserDto, ChangeRoleDto, CreateUserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  // ---------- Create User ---------- //

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  // ---------- Get All Users ---------- //

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  // ---------- Get User By Email ---------- //

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  // ---------- Add Role to User ---------- //

  async getRole(dto: ChangeRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new NotFoundException('User or role are not found');
  }

  // ---------- Remove Role from User ---------- //

  async removeRole(dto: ChangeRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (role && user) {
      await user.$remove('role', role.id);
      return dto;
    }
    throw new NotFoundException('User or role are not found');
  }

  // ---------- Ban User ---------- //

  async ban(dto: BanUserDto) {
    const user = await this.getUserById(dto.userId);

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  // ---------- Get User By Id ---------- //

  async getUserById(userId: number) {
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return user;
  }
}
