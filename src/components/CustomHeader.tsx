import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';

interface CustomHeaderProp {
  title: string;
  onBackPress?: () => void;
  logo?: boolean;
  rightButtonText?: string;
  onRightPress?: () => void;
  pt?: string;
  titleSize?: string;
}

const CustomHeader = ({
  title,
  onBackPress,
  onRightPress,
  rightButtonText,
  pt,
  titleSize,
}: CustomHeaderProp) => {
  return (
    <SafeAreaView className={`  ${pt}  `} edges={['top']}>
      <View
        className={`relative flex flex-row items-center justify-between ${onBackPress ? 'px-2' : 'px-4'}  py-2`}>
        <View className="flex flex-row  items-center gap-3">
          {onBackPress && (
            <TouchableOpacity onPress={onBackPress}>
              <AntDesign name="arrowleft" size={26} color="black" />
            </TouchableOpacity>
          )}
          <Text style={{ fontFamily: 'Poppins-Medium' }} className={`${titleSize}`}>
            {title}
          </Text>
        </View>

        {onRightPress && rightButtonText && (
          <TouchableOpacity onPress={onRightPress}>
            <Text className="text-xl" style={{ fontFamily: 'Poppins-Regular' }}>
              {rightButtonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
