import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import WordCard from './WordCard';
const WordCardContainer = ({ text }: any) => {
  const [activeWordIndex, setActiveWordIndex] = useState(null);

  const handleWordPress = (index: any) => {
    setActiveWordIndex(activeWordIndex === index ? null : index);
  };
  return (
    <TouchableWithoutFeedback onPress={() => setActiveWordIndex(null)}>
      <View className="mt-4 border-secondary px-4">
        <Text className="font-sans text-xl leading-8 text-black">
          {text.split(' ').map((word: any, index: any) => (
            <Text key={index} className="mb-4 block">
              <WordCard
                text={word}
                translation="Sürdürülebilirlik"
                description="Çevresel, ekonomik ve sosyal sistemlerin uzun vadeli dengelerini koruma yeteneği"
                isActive={activeWordIndex === index}
                onPress={() => handleWordPress(index)}
                onClose={() => setActiveWordIndex(null)}
              />{' '}
            </Text>
          ))}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WordCardContainer;
