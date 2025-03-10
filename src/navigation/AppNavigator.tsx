// src/navigation/AppNavigator.tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AuthContext } from '../context/AuthContext';
import HomeScreen from '../screens/app/HomeScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import { colors } from '../styles/common.styles';
import { RootStackParamList, AuthStackParamList, AppTabParamList } from '../types/navigation.types';

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

// Define a type for icon names to solve the TypeScript error

console.log('HomeScreen import:', HomeScreen);
console.log('ProfileScreen import:', ProfileScreen);

const AppNavigator: React.FC = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken === null ? (
        // Auth Stack
        <Stack.Screen name="Auth" component={AuthStackScreen} />
      ) : (
        // App Stack
        <Stack.Screen name="App" component={AppTabsScreen} />
      )}
    </Stack.Navigator>
  );
};

const AuthStackScreen: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text.primary,
        },
        cardStyle: {
          backgroundColor: colors.background.secondary,
        },
      }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Create Account',
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

const AppTabsScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipsis-horizontal';
          }

          // You can return any component here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 5,
        },
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 1,
          shadowOpacity: 0.3,
          shadowOffset: { width: 0, height: 2 },
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text.primary,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Styles for the navigator components
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
  },
});

export default AppNavigator;
