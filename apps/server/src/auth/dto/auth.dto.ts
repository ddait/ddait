import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  name: string;
}

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class ResetPasswordDto {
  @IsEmail()
  email: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
} 