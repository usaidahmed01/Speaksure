import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { store } from './src/app/store';
import RootNavigator from './src/navigation/RootNavigator';
import { loadStoredAuth } from './src/store/authSlice';
import { COLORS } from './src/constants/colors';

function AppContent() {
  const dispatch = useDispatch();
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  useEffect(() => {
    dispatch(loadStoredAuth());
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.background,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="dark" backgroundColor="#FFF8F5" translucent={false} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}