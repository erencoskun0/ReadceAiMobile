import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import PopoverView from './PopoverView';

function processText(text: string) {
  const punctuationRegex = /([.,;:!?()"])/g;
  const spacedText = text.replace(punctuationRegex, '$1');
  return spacedText.split(/\s+/).filter((token) => token.length > 0);
}

const PopoverContainer = ({ content }: { content: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [processedWords, setProcessedWords] = useState<string[]>([]);

  useEffect(() => {
    // İçeriği işleyip state'e kaydediyoruz
    const words = processText(content);
    setProcessedWords(words);

    // Yükleme işlemi tamamlandı olarak işaretleniyor
    setTimeout(() => setIsLoaded(true), 500); // Simüle etmek için 500ms gecikme ekledim
  }, [content]);

  return (
    <View className="mt-4 px-4">
      {isLoaded ? (
        <View className="h-full flex-row flex-wrap leading-8">
          {processedWords.map((word, index) => {
            const punctuationMarks = '.,;:!?()"';
            return punctuationMarks.includes(word) ? (
              <Text
                key={index}
                className="flex flex-row items-center font-medium text-lg text-primary">
                {word}{' '}
              </Text>
            ) : (
              <PopoverView key={index} word={word} textStyle={'font-medium text-lg text-primary'} />
            );
          })}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default PopoverContainer;
