import { SetMetadata } from '@nestjs/common';

export enum EnumRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const ROLES_KEY = 'roles';

export const Roles = (...roles: EnumRole[]) => SetMetadata(ROLES_KEY, roles);
