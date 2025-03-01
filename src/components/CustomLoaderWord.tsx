import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

const CustomLoaderWord = () => {
  return (
    <View className="min-h-screen w-full items-center justify-center">
      <BlurView
        intensity={25}
        tint="regular"
        className="w-full flex-1 items-center justify-center ">
        <LottieView
          source={require('../../assets/lottie/0aKb1dFCuN.json')}
          autoPlay
          loop
          style={styles.lottie}
          resizeMode="contain"
        />
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: 'absolute',
    width: width,
    height: height + 190, // Bottom bar için ekstra alan
    top: -50, // Status bar üstünden başlat
    left: 0,
    zIndex: 9999,
  },
  fullScreenBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 500,
    height: 500,
    marginBottom: '50%', // Bottom bar üstünde görünmesi için
  },
});

export default CustomLoaderWord;
