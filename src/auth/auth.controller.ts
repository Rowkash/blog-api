import * as Swagger from '@nestjs/swagger';
import * as NestDecorators from '@nestjs/common';

import { ValidationPipe } from './../pipes/validation.pipe';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/user.dto';

@Swagger.ApiTags('Authentication')
@NestDecorators.Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ---------- Login User ---------- //

  @Swagger.ApiOperation({ summary: 'Login User' })
  @NestDecorators.Post('/login')
  login(@NestDecorators.Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  // ---------- Registration User ---------- //

  @Swagger.ApiOperation({ summary: 'Create User' })
  @Swagger.ApiOkResponse({ description: 'Created user object as response' })
  @Swagger.ApiBody({
    type: CreateUserDto,
    description: 'Request body for user registration',
  })
  @NestDecorators.UsePipes(ValidationPipe)
  @NestDecorators.Post('/registration')
  registration(@NestDecorators.Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
