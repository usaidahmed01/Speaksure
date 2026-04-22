import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'speaksure_token';
const USER_KEY = 'speaksure_user';

export const saveAuthData = async (token, user) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuthData = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  const userJson = await AsyncStorage.getItem(USER_KEY);

  return {
    token,
    user: userJson ? JSON.parse(userJson) : null,
  };
};

export const clearAuthData = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
  await AsyncStorage.removeItem(USER_KEY);
};