/* eslint-disable prettier/prettier */
// Types for the API response and user data
// src/types/auth.types.ts
export interface Household {
  id: string;
  name: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  totalPoints: number;
  household?: Household;
}

export interface AuthState {
  isLoading: boolean;
  userToken: string | null;
  userInfo: User | null;
  error: string | null;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}
