import { AuthResponse, UserProfile, ExerciseSession, Competition } from '../types';

// Auth endpoints
export const AUTH_ENDPOINTS = {
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
  SIGN_OUT: '/auth/signout',
  REFRESH_TOKEN: '/auth/refresh',
  GET_PROFILE: '/auth/profile'
} as const;

// Exercise endpoints
export const EXERCISE_ENDPOINTS = {
  CREATE_SESSION: '/exercise/sessions',
  GET_SESSION: '/exercise/sessions/:id',
  UPDATE_SESSION: '/exercise/sessions/:id',
  GET_USER_SESSIONS: '/exercise/sessions',
  GET_SESSION_STATS: '/exercise/stats'
} as const;

// Competition endpoints
export const COMPETITION_ENDPOINTS = {
  CREATE_COMPETITION: '/competition',
  GET_COMPETITION: '/competition/:id',
  UPDATE_COMPETITION: '/competition/:id',
  FIND_MATCH: '/competition/match',
  GET_USER_COMPETITIONS: '/competition',
  GET_COMPETITION_STATS: '/competition/stats'
} as const; 