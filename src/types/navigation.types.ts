/* eslint-disable prettier/prettier */
// src/types/navigation.types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack navigation types
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

// App Tab navigation types
export type AppTabParamList = {
  Home: undefined;
  Profile: undefined;
  CreateHousehold: undefined;
  JoinHousehold: undefined;
  Settings: undefined;
};

// Root Stack that contains Auth and App stacks
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppTabParamList>;
};

// Declare navigation types extension for useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
