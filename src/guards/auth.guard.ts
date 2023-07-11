import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY, EnumRole } from '../decorators/role-auth.decorator';
import { Role } from 'src/roles/role.model';

interface currentUser {
  id: number;
  roles: Role[];
}

interface AuthenticatedRequest extends Request {
  user?: currentUser;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: AuthenticatedRequest = context.switchToHttp().getRequest();
    const { user } = request;

    if (!user) {
      throw new UnauthorizedException();
    }

    const methodContextHandler = context.getHandler();
    const classContextHandler = context.getClass();

    const methodRoles =
      this.reflector.get<EnumRole[]>(ROLES_KEY, methodContextHandler) || [];
    const classRoles =
      this.reflector.get<EnumRole[]>(ROLES_KEY, classContextHandler) || [];

    const roles = [...methodRoles, ...classRoles];

    if (!roles.length) {
      return true;
    }

    const canActivate = user.roles.some((currentUserRole) =>
      roles.includes(currentUserRole.value as EnumRole),
    );

    if (!canActivate) {
      throw new ForbiddenException();
    }
    return true;
  }
}
