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
  @Swagger.ApiOkResponse({
    description: 'You successfully log in and receive a token from the server',
    schema: {
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  })
  @Swagger.ApiUnauthorizedResponse({
    description:
      'Unauthorized error response. If the client sends incorrect data for authorization',
  })
  @NestDecorators.Post('/login')
  login(@NestDecorators.Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

  // ---------- Registration User ---------- //

  @Swagger.ApiOperation({ summary: 'Create User' })
  @Swagger.ApiCreatedResponse({
    description:
      'Successfully creating a role and getting a user object from the server',
  })
  @Swagger.ApiBadRequestResponse({
    description: 'If the client entered incorrect data',
  })
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
