import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { speak } from '../utils/speakExpo';

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
};

// Öğrenme durumu butonları
const TabButton = ({ title, value, icon, activeTab, setActiveTab }: any) => (
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
      <Text className={`ml-1 font-semibold ${activeTab === value ? 'text-white' : 'text-primary'}`}>
        {title}
        {/* deneme */}
      </Text>
    </View>
  </TouchableOpacity>
);

const AllWordsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { words, title } = route.params || { words: [], title: 'Tüm Kelimelerim' };

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'learned'
  const [displayWords, setDisplayWords] = useState(words || []);

  useEffect(() => {
    if (words) {
      if (activeTab === 'all') {
        setDisplayWords(words);
      } else if (activeTab === 'learned') {
        setDisplayWords(words.filter((word: any) => word.learned));
      }
    }
  }, [activeTab, words]);

  const markAsLearned = (wordId: string) => {
    // API isteğiyle kelimeyi öğrenildi olarak işaretle (gerçek uygulamada)
    setIsLoading(true);
    // Simülasyon
    setTimeout(() => {
      const updatedWords = displayWords.map((word: any) => {
        if (word.id === wordId) {
          return { ...word, learned: !word.learned };
        }
        return word;
      });
      setDisplayWords(updatedWords);
      setIsLoading(false);
    }, 500);
  };

  const deleteWord = (wordId: string) => {
    // API isteğiyle kelimeyi sil (gerçek uygulamada)
    setIsLoading(true);
    // Simülasyon
    setTimeout(() => {
      const filteredWords = displayWords.filter((word: any) => word.id !== wordId);
      setDisplayWords(filteredWords);
      setIsLoading(false);
    }, 500);
  };

  return (
    <View className="flex-1 bg-[#F8FAFF]">
      <CustomHeader title={title} pt={'pt-[0]'} titleSize={'text-2xl'} />

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Filtreleme Butonları */}
        <View className="mx-4 mb-4 mt-4 flex-row gap-2">
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
            activeTab={activeTab}
            setActiveTab={setActiveTab}
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
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </View>

        {/* Kelime Listesi */}
        <View className="mx-4 mb-6">
          <Text className="text-md mb-3 font-semibold text-primary">
            {activeTab === 'all' ? 'Tüm Kelimeler' : 'Öğrendiğiniz Kelimeler'}:
          </Text>

          {isLoading ? (
            <View className="items-center justify-center py-10">
              <ActivityIndicator size="large" color="#000957" />
            </View>
          ) : (
            <View>
              {Array.isArray(displayWords) && displayWords.length > 0 ? (
                displayWords.map((item: any, index: number) => (
                  <View
                    key={index}
                    className="mb-4 overflow-hidden rounded-2xl bg-white"
                    style={{
                      ...platformStyles.cardShadow,
                      borderWidth: Platform.OS === 'ios' ? 1 : 0,
                      borderColor: Platform.OS === 'ios' ? '#00095710' : 'transparent',
                    }}>
                    {/* Word Header with Level */}
                    <LinearGradient
                      colors={['#000957', '#3B82F6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      className="flex-row items-center justify-between px-4 py-3"
                      style={{ opacity: 0.85 }}>
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
                          style={{
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                          }}>
                          <Text
                            className="font-bold text-xs text-primary"
                            style={{ textAlign: 'center' }}>
                            A2
                          </Text>
                        </View>
                      </View>
                    </LinearGradient>

                    {/* Word Content */}
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

                      {/* Action Buttons */}
                      <View className="mt-4 flex-row justify-between">
                        <TouchableOpacity
                          className="mr-2 flex-1 flex-row items-center justify-center rounded-lg py-2.5"
                          style={{ backgroundColor: item.learned ? '#E8F6F3' : '#F5F5F5' }}
                          onPress={() => markAsLearned(item.id)}>
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
                          onPress={() => deleteWord(item.id)}>
                          <Feather name="trash-2" size={16} color="#E53935" />
                          <Text className="ml-2 font-medium text-sm text-[#E53935]">Sil</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <View className="mt-16 items-center">
                  <Ionicons name="bookmarks" size={50} color="#98D8EF" />
                  <Text className="mt-4 text-lg text-primary">
                    {activeTab === 'all'
                      ? 'Kayıtlı kelime bulunmamaktadır'
                      : 'Öğrenilmiş kelime bulunmamaktadır'}
                  </Text>
                  <Text className="mt-2 text-center text-gray-500">
                    {activeTab === 'all'
                      ? 'Okuduğunuz makalelerdeki bilmediğiniz kelimeler burada görünecek'
                      : 'Öğrendiğiniz kelimeleri burada görebilirsiniz'}
                  </Text>
                  <TouchableOpacity
                    className="mt-6 flex-row items-center rounded-full bg-primary px-6 py-3"
                    style={platformStyles.shadow}
                    onPress={() => navigation.navigate('ExploreScreen')}>
                    <Text className="mr-2 font-bold text-white">Makale Keşfet</Text>
                    <Feather name="arrow-right" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AllWordsScreen;
