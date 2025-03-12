import React from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const CustomLoaderWord = () => {
  return (
    <View className="min-h-screen w-full items-center justify-center">
      <BlurView
        intensity={25}
        tint="regular"
        className="w-full flex-1 items-center justify-center ">
        <ActivityIndicator size="large" color="#0000ff" className="mb-[50%]" />
      </BlurView>
    </View>
  );
};

export default CustomLoaderWord;
