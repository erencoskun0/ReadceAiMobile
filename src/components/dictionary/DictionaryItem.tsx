import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import { Word } from '../../types/word';

interface Props {
  word: Word;
  isLearned: boolean;
  onPress: () => void;
}

const DictionaryItem = ({ word, isLearned, onPress }: Props) => {
  const platformStyles = {
    cardShadow: Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3 rounded-lg bg-white"
      style={platformStyles.cardShadow}>
      <View className="p-3">
        <View className="flex-row justify-between">
          <Text className="font-bold text-[16px] text-[#222222]">{word.eng}</Text>
          <Text
            className={`text-[14px] font-normal ${isLearned ? 'text-green-600' : 'text-gray-400'}`}>
            {isLearned ? 'Öğrenildi' : 'Öğrenilmedi'}
          </Text>
        </View>
        <Text className="mt-2 text-[14px] font-normal text-[#222222]">{word.tr}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DictionaryItem;
