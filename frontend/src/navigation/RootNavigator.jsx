import React from 'react';
import { useSelector } from 'react-redux';

import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';

export default function RootNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />;
}