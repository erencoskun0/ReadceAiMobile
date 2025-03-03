import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Popover from 'react-native-popover-view';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const PopoverView = ({ word }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const touchableRef = useRef<any>(null);
  const noTouchableRef = useRef<any>(null);
  console.log(word);
  const cleanWord = (word: string) => {
    return word.replace(/^[\s\p{P}]+|[\s\p{P}]+$/gu, '');
  };
  return (
    <>
      <TouchableOpacity
        ref={touchableRef}
        onPress={() => setIsVisible(true)}
        className="flex flex-row items-center ">
        <Text className="flex flex-row items-center font-medium text-lg text-primary">{word} </Text>
      </TouchableOpacity>

      <Popover
        ref={noTouchableRef}
        isVisible={isVisible}
        from={touchableRef}
        onRequestClose={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        mode={'rn-modal'}
        animationConfig={{ duration: 100 }}
        verticalOffset={-8}
        arrowSize={{ width: 16, height: 10 }}
        popoverStyle={{
          borderRadius: 12,
          shadowColor: '#000957',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
        }}
        backgroundStyle={{ backgroundColor: 'rgba(0,9,87,0.05)' }}>
        <View className="p-4">
          <View className="flex-row items-start gap-2">
            <TouchableOpacity>
              <MaterialCommunityIcons name="bullhorn-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text className="mb-2 text-center   font-semibold text-xl text-primary">
              {cleanWord(word)}
            </Text>
          </View>

          <Text className="mb-3 text-sm text-primary">Eş anlamlıları:</Text>
          <TouchableOpacity
            className="items-center rounded-lg bg-green-500 p-2"
            onPress={() => setIsVisible(false)}>
            <Text className="font-medium text-white">Sözlüğe Ekle</Text>
          </TouchableOpacity>
        </View>
      </Popover>
    </>
  );
};

export default PopoverView;
