import { ValidationPipe } from './../pipes/validation.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ---------- Login User ---------- //

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  // ---------- Registration User ---------- //

  @ApiOperation({ summary: 'Create User' })
  @ApiOkResponse({ description: 'Created user object as response' })
  @ApiBody({
    type: CreateUserDto,
    description: 'Request body for user registration',
  })
  @UsePipes(ValidationPipe)
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
