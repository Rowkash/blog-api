import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.model';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user.dto';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  // ---------- Login User ---------- //

  async login(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  // ---------- Registration User ---------- //

  async registration(userDto: CreateUserDto): Promise<{ token: string }> {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new BadRequestException('Email already exist');
    }

    const hashPass = await hash(userDto.password);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });
    return this.generateToken(user);
  }

  // ---------- Generate Token ---------- //

  private async generateToken(user: User): Promise<{ token: string }> {
    const data = { id: user.id, roles: user.roles };
    const token = this.jwtService.sign(data, {
      expiresIn: '24h',
    });
    return { token };
  }

  // ---------- Validate User ---------- //

  private async validateUser(dto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(dto.email);
    if (user) {
      const passEquals = await verify(user.password, dto.password);
      if (passEquals) return user;
    }

    throw new UnauthorizedException({ message: 'Wrong email or password' });
  }
}
