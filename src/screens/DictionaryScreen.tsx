import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import { useQuery } from '@tanstack/react-query';
import { GetAllWordUserProgress } from '../services/apiWord';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/store';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const DictionaryScreen = () => {
  const { userId } = useSelector((state: RootState) => state.authUser);

  const {
    data: GetAllWordUserProgressData,
    isLoading: isLoadingProgress,
    refetch: progressRefetch,
  } = useQuery({
    queryKey: ['GetAllWordUserProgress', userId],
    queryFn: () => GetAllWordUserProgress(userId ? userId : ''),
    enabled: !!userId,
  });

  useFocusEffect(
    React.useCallback(() => {
      progressRefetch();
    }, [])
  );

  return (
    <View className="flex-1 bg-[#F8FAFF]">
      <CustomHeader title="Sözlüğüm" pt={'pt-[0]'} titleSize={'text-2xl'} />

      {/* Kelime Tekrarı Butonu */}
      <TouchableOpacity
        className="mx-4 my-4 flex-row items-center justify-between rounded-xl bg-primary p-4 shadow-lg"
        style={{ elevation: 5, shadowColor: '#00095740' }}>
        <Text className="font-bold text-lg text-white">Kelime Tekrarı Yap</Text>
        <Ionicons name="game-controller" size={24} color="#98D8EF" />
      </TouchableOpacity>
      <View>
        <Text className="text-md px-4  pb-2 font-semibold text-primary">
          Sözlüğünüzdeki Tüm Kelimeler:
        </Text>
      </View>
      {isLoadingProgress ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#000957" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isLoadingProgress}
              onRefresh={() => progressRefetch()}
              colors={['#000957']} // Android için
              tintColor={'#000957'} // iOS için
            />
          }
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}>
          {/* Kelime Listesi */}
          <View className=" ">
            {GetAllWordUserProgressData?.map((item, index) => (
              <View
                key={index}
                className="mx-4 mb-3 rounded-xl bg-white p-4"
                style={{
                  borderWidth: 1,
                  borderColor: '#00095720',
                  shadowColor: '#000957',
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2 space-x-3">
                    {/* Dil Bayrağı Simülasyonu */}
                    <TouchableOpacity className="h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
                      <MaterialCommunityIcons name="bullhorn-outline" size={24} color="#000957" />
                    </TouchableOpacity>

                    <Text style={{ fontSize: 18 }} className="font-bold text-lg text-primary">
                      {item.wordMeaning.wordText}
                    </Text>
                  </View>
                  <TouchableOpacity>
                    {' '}
                    <Ionicons name="close-circle" size={24} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
                {item.wordMeaning.meaning && (
                  <View className=" mt-1">
                    <Text
                      style={{ marginLeft: 32, fontSize: 15 }}
                      className="    font-bold text-secondary">
                      {item.wordMeaning.meaning}
                    </Text>
                  </View>
                )}

                {item.wordMeaning.meaningDesc && (
                  <View className="mt-2 flex-row">
                    {/* Border Container */}
                    <View
                      style={{
                        width: 4,
                        backgroundColor: '#98D8EF',
                        borderRadius: 2,
                        marginRight: 8,

                        height: '70%', // Metnin %70'i kadar yükseklik
                        marginTop: 4, // Dikey hizalama için
                      }}
                    />

                    {/* Text Container */}
                    <Text
                      className=" italic text-gray-500"
                      style={{
                        lineHeight: 18,
                        flexShrink: 1,
                      }}>
                      {item.wordMeaning.meaningDesc}
                    </Text>
                  </View>
                )}
              </View>
            ))}

            {/* Boş Liste Uyarısı */}
            {!GetAllWordUserProgressData?.length && (
              <View className="mt-20 items-center">
                <Ionicons name="bookmarks" size={50} color="#98D8EF" />
                <Text className="mt-4 text-lg text-primary">Kayıtlı kelimeniz bulunmamaktadır</Text>
                <Text className="mt-2 text-gray-500">
                  Okuduğunuz makalelerdeki kelimeler burada görünecek
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default DictionaryScreen;
