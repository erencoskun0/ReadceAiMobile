import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/store';

export default function SplashScreen({ navigation }: any) {
  const { isAuthenticated } = useSelector((state: RootState) => state.authUser);
  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Home');
      } else {
        navigation.replace('Auth');
      }
    }, 2000);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <Image source={require('../../assets/logo.png')} className="h-40 w-60" />
    </View>
  );
}
