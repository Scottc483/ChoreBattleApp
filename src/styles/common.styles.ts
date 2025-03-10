/* eslint-disable prettier/prettier */

// src/styles/common.styles.ts
import { StyleSheet } from 'react-native';

// Define colors
export const colors = {
  primary: '#007BFF',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
  white: '#ffffff',
  black: '#000000',
  gray: '#6c757d',
  grayLight: '#f5f5f5',
  grayDark: '#343a40',
  border: '#ddd',
  text: {
    primary: '#212529',
    secondary: '#6c757d',
    muted: '#6c757d',
  },
  background: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
  },
};

// Define shared text styles
export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 15,
  },
  body: {
    fontSize: 16,
    color: colors.text.primary,
  },
  caption: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  error: {
    fontSize: 14,
    color: colors.danger,
    marginBottom: 10,
  },
  link: {
    fontSize: 14,
    color: colors.primary,
  },
});

// Define shared layout styles
export const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padded: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
});

// Define shared input styles
export const inputStyles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  button: {
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: colors.danger,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
});

// Define shared card styles
export const cardStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardBody: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export default {
  colors,
  textStyles,
  layoutStyles,
  inputStyles,
  cardStyles,
};
