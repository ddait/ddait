export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  nickname: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    nickname: string;
  };
}

export interface AuthError {
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'EMAIL_ALREADY_EXISTS' | 'INVALID_EMAIL' | 'INVALID_PASSWORD';
  message: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  exp: number;
} 