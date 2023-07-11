import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { Role } from 'src/roles/role.model';

interface currentUser {
  id: number;
  roles: Role[];
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  public async use(request: Request, _: Response, next: NextFunction) {
    const { headers } = request;
    const { authorization } = headers;

    if (!authorization) {
      request.user = null;

      return next();
    }

    const [, token] = authorization.split(' ');

    try {
      const { id, roles }: currentUser = await this.jwtService.verifyAsync(
        token,
      );

      request.user = {
        id,
        roles,
      };
    } catch (error) {
      request.user = null;
    } finally {
      return next();
    }
  }
}
