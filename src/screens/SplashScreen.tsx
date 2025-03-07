import { View, Text, Image } from 'react-native';
import React, { useEffect } from 'react';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);
  }, [navigation]);

  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <Image source={require('../../assets/logo.png')} className="h-40 w-60" />
    </View>
  );
}
