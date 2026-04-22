export const COLORS = {
  primary: '#EA3D14',
  primaryDark: '#C92F0E',
  secondary: '#263238',

  background: '#FFF8F5',
  card: '#FFFFFF',
  inputBg: '#FFF3EE',

  white: '#FFFFFF',
  black: '#111111',
  text: '#222222',
  muted: '#777777',
  border: '#E5E5E5',

  success: '#2E7D32',
  danger: '#D32F2F',
};

export const DARK_COLORS = {
  primary: '#FF7043',
  primaryDark: '#EA3D14',
  secondary: '#ECEFF1',

  background: '#121212',
  card: '#1E1E1E',
  inputBg: '#2A2A2A',

  white: '#FFFFFF',
  black: '#000000',
  text: '#F5F5F5',
  muted: '#B0B0B0',
  border: '#333333',

  success: '#66BB6A',
  danger: '#EF5350',
};

export const getThemeColors = (mode) => {
  return mode === 'dark' ? DARK_COLORS : COLORS;
};