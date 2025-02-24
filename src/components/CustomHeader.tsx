import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomHeaderProp {
  title: string;
  onBackPress?: () => void;
  logo?: boolean;
  rightButtonText?: string;
  onRightPress?: () => void;
}

const CustomHeader = ({
  title,
  onBackPress,
  onRightPress,
  logo,
  rightButtonText,
}: CustomHeaderProp) => {
  return (
    <SafeAreaView className="bg-secondary " edges={['top']}>
      <View className="relative flex flex-row items-center justify-between px-4 py-2">
        {/* Sol tarafta geri butonu varsa */}
        {onBackPress ? (
          <TouchableOpacity onPress={onBackPress}>
            <Text className="text-white">{'< Back'}</Text>
          </TouchableOpacity>
        ) : (
          logo && (
            <TouchableOpacity className="flex h-12 w-12  items-center justify-center   rounded-full bg-blue-400">
              <Image source={require('../../assets/logo.png')} className=" h-8 w-10" />{' '}
            </TouchableOpacity>
          )
        )}

        <View className="flex-row items-center"></View>

        {/* Sağ tarafta buton varsa */}
        {onRightPress && rightButtonText ? (
          <TouchableOpacity onPress={onRightPress}>
            <Text className="text-white">{rightButtonText}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity></TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
