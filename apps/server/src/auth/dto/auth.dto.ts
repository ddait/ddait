import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '비밀번호 (최소 8자)'
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: '사용자 이름'
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: '프로필 이미지 URL',
    required: false
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class SignInDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: '비밀번호'
  })
  @IsString()
  password: string;
}

export class ProfileDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ 
    example: 'https://example.com/avatar.jpg',
    required: false
  })
  avatarUrl?: string;
}

export class AuthResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: '액세스 토큰'
  })
  accessToken: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIs...',
    description: '리프레시 토큰'
  })
  refreshToken: string;

  @ApiProperty({
    description: '사용자 정보',
    type: ProfileDto
  })
  user: ProfileDto;
}

export class UpdatePasswordDto {
  @ApiProperty({ example: 'currentPassword123' })
  @IsString()
  @MinLength(8)
  currentPassword: string;

  @ApiProperty({ example: 'newPassword123' })
  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class ProfileResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty({ required: false })
  avatarUrl?: string;

  @ApiProperty()
  level: number;

  @ApiProperty()
  exp: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
} 