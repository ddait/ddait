import { ApiProperty, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

export class SignUpRequestDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'Test123!@#',
    description: 'User password (min 8 chars, must include uppercase, lowercase, number and special char)',
  })
  password: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'Username (min 3 chars)',
  })
  username: string;
}

export class SignInRequestDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'Test123!@#',
    description: 'User password',
  })
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({
    example: {
      id: 'uuid',
      email: 'user@example.com',
      username: 'johndoe',
    },
    description: 'User information',
  })
  user: any;

  @ApiProperty({
    example: {
      access_token: 'jwt-token',
      refresh_token: 'refresh-token',
    },
    description: 'Session information',
  })
  session?: any;
}

export class MessageResponseDto {
  @ApiProperty({
    example: 'Operation successful',
    description: 'Response message',
  })
  message: string;
}

@ApiTags('Authentication')
export class AuthControllerDocs {
  @ApiOperation({ summary: 'Create new user account' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  signUp() {}

  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({
    status: 201,
    description: 'Successfully signed in',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  @ApiResponse({
    status: 429,
    description: 'Too many attempts',
  })
  signIn() {}

  @ApiOperation({ summary: 'Sign in with Google' })
  @ApiResponse({
    status: 200,
    description: 'Google OAuth URL',
  })
  signInWithGoogle() {}

  @ApiOperation({ summary: 'Sign out current user' })
  @ApiResponse({
    status: 201,
    description: 'Successfully signed out',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  signOut() {}

  @ApiOperation({ summary: 'Send password reset email' })
  @ApiResponse({
    status: 201,
    description: 'Password reset email sent',
    type: MessageResponseDto,
  })
  resetPassword() {}

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 201,
    description: 'Password successfully updated',
    type: MessageResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid password format',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  updatePassword() {}

  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({
    status: 200,
    description: 'User information retrieved',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  getUser() {}

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 201,
    description: 'Token refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid refresh token',
  })
  refreshToken() {}
} 