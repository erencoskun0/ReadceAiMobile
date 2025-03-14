import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import PopoverView from './PopoverView';

function processText(text: string) {
  const punctuationRegex = /([.,;:!?()"])/g;
  const spacedText = text.replace(punctuationRegex, '$1');
  return spacedText.split(/\s+/).filter((token) => token.length > 0);
}

const PopoverContainer = ({
  content,
  handlerFinish,
  finishQuery,
}: {
  content: string;
  handlerFinish: any;
  finishQuery: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [processedWords, setProcessedWords] = useState<string[]>([]);

  useEffect(() => {
    const words = processText(content);
    setProcessedWords(words);

    setTimeout(() => setIsLoaded(true), 500);
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
          {!finishQuery && (
            <TouchableOpacity
              onPress={() => handlerFinish()}
              className="mx-auto mt-10 w-[80%] rounded-full bg-blue-500 py-2">
              <Text className="text-center font-semibold text-lg text-white ">Okumayı Bitir</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default PopoverContainer;
