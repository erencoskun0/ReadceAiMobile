import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useQuery } from '@tanstack/react-query';
import { GetAllWordUserProgress } from '../services/apiWord';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/store';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
  FontAwesome5,
} from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { speak } from '../utils/speakExpo';

const { width } = Dimensions.get('window');

// Platform spesifik stiller
const platformStyles = {
  shadow: Platform.select({
    ios: {
      shadowColor: '#000957',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    android: {
      elevation: 2,
    },
  }),
  cardShadow: Platform.select({
    ios: {
      shadowColor: '#000957',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
  }),
  levelBadge: Platform.select({
    ios: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    android: {
      paddingVertical: 0.5,
      paddingHorizontal: 2,
    },
  }),
  wordHeader: Platform.select({
    ios: {
      paddingVertical: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    android: {
      paddingVertical: 3,
    },
  }),
};

// Dil seviye bilgileri
const languageLevels = [
  {
    id: 'a1',
    title: 'A1 Seviyesi',
    description: 'Başlangıç',
    color: '#6366F1',
    icon: 'baby',
    totalWords: 56,
    learnedWords: 28,
  },
  {
    id: 'a2',
    title: 'A2 Seviyesi',
    description: 'Temel',
    color: '#8B5CF6',
    icon: 'child',
    totalWords: 120,
    learnedWords: 42,
  },
  {
    id: 'b1',
    title: 'B1 Seviyesi',
    description: 'Orta',
    color: '#EC4899',
    icon: 'walking',
    totalWords: 210,
    learnedWords: 75,
  },
  {
    id: 'b2',
    title: 'B2 Seviyesi',
    description: 'Orta-Üstü',
    color: '#F97316',
    icon: 'running',
    totalWords: 350,
    learnedWords: 120,
  },
  {
    id: 'c1',
    title: 'C1 Seviyesi',
    description: 'İleri',
    color: '#10B981',
    icon: 'user-graduate', // Daha ileri seviye bir ikon önerisi
    totalWords: 500,
    learnedWords: 200,
  },
  {
    id: 'c2',
    title: 'C2 Seviyesi',
    description: 'Ustalık',
    color: '#0EA5E9',
    icon: 'user-tie', // Ustalığı temsil eden ikon
    totalWords: 700,
    learnedWords: 300,
  },
];

const DictionaryScreen = () => {
  const { userId } = useSelector((state: RootState) => state.authUser);
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'favorites', 'learned'

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
      if (userId) {
        progressRefetch();
      }
    }, [])
  );

  const navigateToLevelWords = (levelId: string, levelTitle: string) => {
    // Bu fonksiyon belirli seviyedeki kelimelere yönlendirir
    // navigation.navigate('LevelWordsScreen', { levelId, levelTitle });
    console.log(`Navigating to ${levelTitle} words`);
  };

  const navigateToAllWords = () => {
    // Tüm kelimeleri göster ekranına yönlendir
    navigation.navigate('AllWordsScreen', {
      words: GetAllWordUserProgressData,
      title: 'Tüm Kelimelerim',
    });
  };

  const TabButton = ({ title, value, icon }: { title: string; value: string; icon: any }) => (
    <TouchableOpacity
      onPress={() => setActiveTab(value)}
      className={`items-center justify-center rounded-full px-3 py-2 ${
        activeTab === value ? 'bg-primary' : 'border border-gray-200 bg-white'
      }`}
      style={{
        minWidth: 100,
        ...platformStyles.shadow,
      }}>
      <View className="flex-row items-center">
        {icon}
        <Text
          className={`ml-1 font-semibold ${activeTab === value ? 'text-white' : 'text-primary'}`}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#F8FAFF]">
      <CustomHeader title="Sözlüğüm" pt={'pt-[0]'} titleSize={'text-2xl'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingProgress}
            onRefresh={() => {
              if (userId) {
                progressRefetch();
              }
            }}
            colors={['#000957']}
            tintColor={'#000957'}
          />
        }
        contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Ana İstatistik Kartı */}
        <View
          className="mx-4 my-4 rounded-xl border border-[#00095710] bg-white p-4"
          style={platformStyles.cardShadow}>
          <Text className="mb-3 font-bold text-lg text-primary">Kelime Öğrenme İlerlemeniz</Text>

          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Ionicons name="book-outline" size={20} color="#0000ff" />
              </View>
              <View className="ml-3">
                <Text className="text-sm text-gray-500">Toplam Kelime</Text>
                <Text className="font-bold text-lg text-primary">
                  {Array.isArray(GetAllWordUserProgressData)
                    ? GetAllWordUserProgressData.length
                    : 0}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="flex-row items-center rounded-full bg-blue-50 px-4 py-2"
              onPress={navigateToAllWords}>
              <Text className="mr-1 font-medium text-primary">Tümünü Gör</Text>
              <Feather name="arrow-right" size={16} color="#000957" />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={['#000957', '#98D8EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="overflow-hidden rounded-full"
            style={{ height: 32, width: '100%', borderRadius: 16 }}>
            <View className="h-full justify-center px-3">
              <Text className="font-medium text-xs text-white">
                %
                {Math.round(
                  (Array.isArray(GetAllWordUserProgressData)
                    ? GetAllWordUserProgressData.filter((word) => word.learned).length /
                      (GetAllWordUserProgressData.length || 1)
                    : 0) * 100
                )}{' '}
                Tamamlandı
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Kelime Tekrarı Butonu */}
        <TouchableOpacity
          className="mx-4 mb-4 flex-row items-center justify-between rounded-xl border border-[#00095720] bg-white p-4"
          style={{
            ...platformStyles.shadow,
          }}>
          <View className="flex-row items-center">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#98D8EF40]">
              <Ionicons name="game-controller" size={18} color="#000957" />
            </View>
            <View>
              <Text className="font-bold text-primary">Kelime Tekrarı Yap</Text>
              <Text className="text-xs text-gray-500">Kelime bilginizi test edin</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={24} color="#98D8EF" />
        </TouchableOpacity>

        {/* Seviye Kartları - Dikey Görünüm */}
        <View className="mx-4 mb-4">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="font-bold text-lg text-primary">Dil Seviyeleri</Text>
            {/* <TouchableOpacity className="flex-row items-center">
              <Text className="mr-1 font-medium text-blue-500">Tümü</Text>
              <Feather name="chevron-right" size={18} color="#3B82F6" />
            </TouchableOpacity>*/}
          </View>

          {/* Dikey seviye kartları */}
          <View className="flex gap-4  ">
            {languageLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                onPress={() => navigateToLevelWords(level.id, level.title)}
                className="  rounded-xl border border-[#00095710] bg-white p-4"
                style={{
                  ...platformStyles.cardShadow,
                }}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View
                      className="mr-3 h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${level.color}20` }}>
                      <FontAwesome5 name={level.icon} size={16} color={level.color} />
                    </View>
                    <View>
                      <Text className="font-bold text-[#000957]">{level.title}</Text>
                      <Text className="text-xs text-gray-500">{level.description}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="mr-2 font-bold text-primary">
                      {level.learnedWords}/{level.totalWords}
                    </Text>
                    <Feather name="chevron-right" size={16} color="#3B82F6" />
                  </View>
                </View>

                <View className="mt-3">
                  <View className="mb-1 flex-row justify-between">
                    <Text className="text-xs text-gray-500">İlerleme</Text>
                    <Text className="font-medium text-xs text-primary">
                      {Math.round((level.learnedWords / level.totalWords) * 100)}%
                    </Text>
                  </View>
                  <View className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${(level.learnedWords / level.totalWords) * 100}%`,
                        backgroundColor: level.color,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Kelime Filtreleme 
        <View className="mx-4 mb-4 flex-row gap-2">
          <TabButton
            title="Tümü"
            value="all"
            icon={
              <Ionicons
                name="documents-outline"
                size={16}
                color={activeTab === 'all' ? 'white' : '#000957'}
              />
            }
          />

          <TabButton
            title="Öğrenilen"
            value="learned"
            icon={
              <Ionicons
                name="checkmark-circle-outline"
                size={16}
                color={activeTab === 'learned' ? 'white' : '#000957'}
              />
            }
          />
        </View>

      
        <View className="mx-4">
          <Text className="text-md mb-3 font-semibold text-primary">
            {activeTab === 'all'
              ? 'Sözlüğünüzdeki Tüm Kelimeler'
              : activeTab === 'favorites'
                ? 'Favori Kelimeleriniz'
                : 'Öğrendiğiniz Kelimeler'}
            :
          </Text>

          {isLoadingProgress ? (
            <View className="items-center justify-center py-10">
              <ActivityIndicator size="large" color="#000957" />
            </View>
          ) : (
            <View>
              {Array.isArray(GetAllWordUserProgressData) &&
              GetAllWordUserProgressData.length > 0 ? (
                GetAllWordUserProgressData.filter((item) => {
                  if (activeTab === 'all') return true;
                  if (activeTab === 'favorites') return item.favorite;
                  if (activeTab === 'learned') return item.learned;
                  return true;
                }).map((item, index) => (
                  <View
                    key={index}
                    className="mb-4 overflow-hidden rounded-2xl bg-white"
                    style={{
                      ...platformStyles.cardShadow,
                      borderWidth: Platform.OS === 'ios' ? 1 : 0,
                      borderColor: Platform.OS === 'ios' ? '#00095710' : 'transparent',
                    }}>
                    {/* Word Header with Level 
                    <LinearGradient
                      colors={['#000957', '#3B82F6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={{
                        opacity: 0.85,
                        ...platformStyles.wordHeader,
                      }}
                      className="flex-row items-center justify-between px-4 py-3">
                      <View className="flex-row items-center">
                        <Text className="font-bold text-lg text-white">
                          {item.wordMeaning.wordText}
                        </Text>
                        <TouchableOpacity
                          onPress={() => speak(item.wordMeaning.wordText)}
                          className="ml-2 rounded-full bg-white/20 p-1.5">
                          <MaterialCommunityIcons name="bullhorn-outline" size={16} color="white" />
                        </TouchableOpacity>
                      </View>
                      <View style={Platform.OS === 'ios' ? { alignSelf: 'center' } : {}}>
                        <View
                          className="rounded-full bg-[#98D8EF]"
                          style={
                            Platform.OS === 'ios'
                              ? {
                                  paddingHorizontal: 8,
                                  paddingVertical: 2,
                                }
                              : {
                                  paddingHorizontal: 8,
                                  paddingVertical: 2,
                                }
                          }>
                          <Text
                            className="font-bold text-xs text-primary"
                            style={{ textAlign: 'center' }}>
                            A2
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* Word Content * 
                    <View className="p-4">
                      {item.wordMeaning.meaning && (
                        <View className="mb-3 rounded-lg bg-blue-50 px-3 py-2">
                          <Text className="mb-1 text-xs text-gray-500">ANLAMI</Text>
                          <Text className="font-bold text-primary">{item.wordMeaning.meaning}</Text>
                        </View>
                      )}

                      {item.wordMeaning.meaningDesc && (
                        <View className="mb-3">
                          <Text className="mb-1 text-xs text-gray-500">EK ANLAMLAR</Text>
                          <Text className="text-gray-700">{item.wordMeaning.meaningDesc}</Text>
                        </View>
                      )}

                      {/* Action Buttons * 
                      <View className="mt-4 flex-row justify-between">
                        <TouchableOpacity
                          className="mr-2 flex-1 flex-row items-center justify-center rounded-lg py-2.5"
                          style={{ backgroundColor: item.learned ? '#E8F6F3' : '#F5F5F5' }}
                          onPress={() => {}}>
                          <Ionicons
                            name={item.learned ? 'checkmark-circle' : 'school-outline'}
                            size={16}
                            color={item.learned ? '#2ECC71' : '#757575'}
                          />
                          <Text
                            className="ml-2 font-medium text-sm"
                            style={{ color: item.learned ? '#2ECC71' : '#757575' }}>
                            {item.learned ? 'Öğrenildi' : 'Öğrenildi İşaretle'}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="flex-row items-center justify-center rounded-lg bg-[#FFEBEE] px-3 py-2.5"
                          onPress={() => {}}>
                          <Feather name="trash-2" size={16} color="#E53935" />
                          <Text className="ml-2 font-medium text-sm text-[#E53935]">Sil</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View className="mt-6 items-center">
                  <Ionicons name="bookmark-outline" size={50} color="#98D8EF" />
                  <Text className="mt-4 text-lg text-primary">
                    Tüm kelime listenizi görüntüleyin
                  </Text>
                  <Text className="mt-2 px-6 text-center text-gray-500">
                    Kelime listenize erişmek için üstteki "Tümünü Gör" butonuna dokunun
                  </Text>
                  <TouchableOpacity
                    className="mt-6 flex-row items-center rounded-full bg-primary px-6 py-3"
                    style={platformStyles.shadow}
                    onPress={navigateToAllWords}>
                    <Text className="mr-2 font-bold text-white">Tüm Kelimelerim</Text>
                    <Feather name="arrow-right" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>*/}
      </ScrollView>
    </View>
  );
};

export default DictionaryScreen;
