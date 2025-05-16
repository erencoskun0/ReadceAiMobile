import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import './global.css'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import TabNavigator from './src/navigation/TabNavigator';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthNavigator from './src/navigation/AuthNavigator';
import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './src/Redux/Store/store';
import ToastManager from 'toastify-react-native';

import AppContent from './src/AppContent';
const Stack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 5,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <StatusBar style="dark"  />
        <AppContent />
      </Provider>
    </QueryClientProvider>
  );
}
