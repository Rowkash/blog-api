import * as Swagger from '@nestjs/swagger';
import * as Validator from 'class-validator';

// ---------- Registration User DTO ---------- //

export class CreateUserDto {
  @Swagger.ApiProperty({ example: 'Bobby', description: 'User name' })
  @Validator.IsString({ message: 'Must be a string' })
  @Validator.Length(4, 16, { message: 'Name must have 4-16 symbol' })
  readonly name: string;

  @Swagger.ApiProperty({ example: 'bobby@man.com', description: 'User email' })
  @Validator.IsString({ message: 'Must be a string' })
  @Validator.IsEmail({}, { message: 'Incorrect email' })
  readonly email: string;

  @Swagger.ApiProperty({ example: '123456', description: 'User password' })
  @Validator.IsString({ message: 'Must be a string' })
  @Validator.Length(4, 16, { message: 'Password should have 4-16 symbols' })
  readonly password: string;
}

// --------- Login User DTO ---------- //

export class LoginUserDto extends Swagger.OmitType(CreateUserDto, ['name']) {}

// --------- Ban User DTO ---------- //

export class BanUserDto {
  @Swagger.ApiProperty({ example: 3, description: 'User ID' })
  @Validator.IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;

  @Swagger.ApiProperty({
    example: 'For bad behavior',
    description: 'Ban reason',
    required: false,
  })
  @Validator.IsOptional()
  @Validator.IsString()
  banReason: string;
}

// --------- Change User Role DTO ---------- //

export class ChangeRoleDto {
  @Swagger.ApiProperty({ example: 'ADMIN', description: 'Role name' })
  @Validator.IsString({ message: 'Should be a string' })
  readonly value: string;

  @Swagger.ApiProperty({ example: 3, description: 'User ID' })
  @Validator.IsNumber({}, { message: 'Should be a number' })
  readonly userId: number;
}
