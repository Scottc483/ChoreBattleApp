// src/context/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosInstance } from 'axios';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';

import { User, AuthState, LoginResponse, RegisterResponse } from '../types/auth.types';

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authAxios: AxiosInstance;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    userToken: null,
    userInfo: null,
    error: null,
  });

  // Replace with your API base URL
  const getBaseUrl = () => {
    if (__DEV__) {
      // Development - detect platform
      if (Platform.OS === 'android') {
        return 'http://10.0.2.2:3000/api';
      }
      return 'http://localhost:3000/api';
    }
    // Production
    return 'http://localhost:3000/api';
  };

  const BASE_URL = getBaseUrl();

  const login = async (email: string, password: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.post<LoginResponse>(`${BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { user, token } = response.data;

      if (token) {
        setState((prev) => ({
          ...prev,
          userToken: token,
          userInfo: user,
        }));

        // Store token and user info
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      } else {
        setState((prev) => ({ ...prev, error: 'Authentication failed' }));
      }
    } catch (error) {
      console.log('Login error: ', error);
      let errorMessage = 'An error occurred during login';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.post<RegisterResponse>(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      const { user, token } = response.data;

      if (token) {
        setState((prev) => ({
          ...prev,
          userToken: token,
          userInfo: user,
        }));

        // Store token and user info
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userInfo', JSON.stringify(user));
      } else {
        setState((prev) => ({ ...prev, error: 'Registration failed' }));
      }
    } catch (error) {
      console.log('Registration error: ', error);
      let errorMessage = 'An error occurred during registration';

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      setState((prev) => ({ ...prev, error: errorMessage }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = async (): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');

      setState((prev) => ({
        ...prev,
        userToken: null,
        userInfo: null,
      }));
    } catch (error) {
      console.log('Logout error: ', error);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const isLoggedIn = async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, isLoading: true }));

      const userToken = await AsyncStorage.getItem('userToken');
      const userInfoString = await AsyncStorage.getItem('userInfo');

      if (userInfoString) {
        const userInfo: User = JSON.parse(userInfoString);
        setState((prev) => ({ ...prev, userInfo }));
      }

      if (userToken) {
        setState((prev) => ({ ...prev, userToken }));
      }
    } catch (e) {
      console.log(`isLoggedIn error: ${e}`);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  // API request with authentication
  const authAxios: AxiosInstance = axios.create({
    baseURL: BASE_URL,
  });

  authAxios.interceptors.request.use(
    async (config) => {
      if (state.userToken) {
        config.headers.Authorization = `Bearer ${state.userToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        authAxios,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
