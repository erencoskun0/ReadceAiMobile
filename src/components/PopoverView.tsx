import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Popover from 'react-native-popover-view';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { speak } from '../utils/speakExpo';
import { AddWordUserProgress, GetTextMeanByText } from '../services/apiWord';
import { isEnabled } from 'react-native/Libraries/Performance/Systrace';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { RootState } from '../Redux/Store/store';
import { useSelector } from 'react-redux';
import { Toast } from 'toastify-react-native';

const PopoverView = ({ word, textStyle }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const touchableRef = useRef<any>(null);
  const noTouchableRef = useRef<any>(null);
  const { userId } = useSelector((state: RootState) => state.authUser);
  const cleanWord = (word: string) => {
    return word.replace(/^[\s\p{P}]+|[\s\p{P}]+$/gu, '');
  };
  const {
    data: wordData,
    isLoading,
    error: meaningError,
  } = useQuery({
    queryKey: ['wordMeaning', cleanWord(word)],
    queryFn: async () => {
      const cleaned = cleanWord(word);
      if (!cleaned) return null;
      return await GetTextMeanByText(cleaned);
    },
    enabled: isVisible && !!word?.trim(),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    retryDelay: 1000,
    select: useCallback((data: any) => {
      // Veriyi component içinde transform etmek yerine
      return {
        ...data,
        formattedDesc: data?.wordDesc?.split(',')?.join(', '),
      };
    }, []),
  });

  const { mutate: AddWordUserProgressPost, isPending: isProgressPending } = useMutation({
    mutationFn: () => {
      if (!userId || !wordData) {
        return Promise.reject(new Error('User ID veya wordData eksik'));
      }
      return AddWordUserProgress(
        userId,
        wordData.wordId,
        wordData.wordMeanId,
        wordData.nativeLanguageId,
        wordData.learningLanguageId
      );
    },
    mutationKey: ['AddWordUserProgress'],
    onSuccess: () => {
      Toast.success('Kelime başarıyla sözlüğe eklendi');
    },
    onError: () => {
      Toast.info('Kelime zaten sözlüğünüzde');
    },
  });
  return (
    <>
      <TouchableOpacity ref={touchableRef} onPress={() => setIsVisible(true)} className="  ">
        <Text className={`${textStyle}`}>{word} </Text>
      </TouchableOpacity>

      <Popover
        ref={noTouchableRef}
        isVisible={isVisible}
        from={touchableRef}
        onRequestClose={() => setIsVisible(false)}
        onBackdropPress={() => setIsVisible(false)}
        mode={'rn-modal'}
        animationConfig={{ duration: 100 }}
        verticalOffset={2}
        arrowSize={{ width: 16, height: 10 }}
        popoverStyle={{
          width: 'auto',
          borderRadius: 12,
          shadowColor: '#000957',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
        }}
        backgroundStyle={{ backgroundColor: 'rgba(0,9,87,0.05)' }}>
        {isVisible && (
          <View className="  p-5">
            {/* Başlık ve Ses Butonu */}
            <View className="mb-5 flex-row items-start gap-4">
              <TouchableOpacity
                onPress={() => speak(cleanWord(word))}
                className="rounded-lg bg-primary/5 p-2 active:bg-primary/10">
                <MaterialCommunityIcons name="bullhorn-outline" size={24} color="#000957" />
              </TouchableOpacity>

              <View className="flex ">
                <Text className="text-nowrap font-bold text-2xl leading-tight text-primary">
                  {cleanWord(word)}
                </Text>
                {wordData?.wordMean ? (
                  <Text className="text-md mt-2    font-medium text-secondary">
                    {wordData.wordMean}
                  </Text>
                ) : isLoading ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  ''
                )}
              </View>
            </View>

            {/* Eş Anlamlılar */}
            {wordData?.wordDesc && (
              <View className="mb-6">
                <View className="mb-3 flex-row items-center gap-2">
                  <View className="h-5 w-[3px] rounded-full bg-secondary" />
                  <Text className="text-nowrap font-semibold text-sm tracking-wider text-primary">
                    EŞ ANLAMLILAR
                  </Text>
                </View>
                <Text className="leading-2 text-nowrap font-sans text-base text-primary/80">
                  {wordData.wordDesc}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => {
                AddWordUserProgressPost();
                setIsVisible(false);
              }}
              className="w-full flex-row items-center justify-center rounded-xl bg-secondary/90 p-4 transition-all hover:bg-secondary active:scale-95">
              <Entypo name="plus" size={24} color="white" />
              <Text className="font-PoppinsSemiBold ml-2 text-white">Sözlüğe Ekle</Text>
            </TouchableOpacity>
          </View>
        )}
      </Popover>
    </>
  );
};

export default PopoverView;
