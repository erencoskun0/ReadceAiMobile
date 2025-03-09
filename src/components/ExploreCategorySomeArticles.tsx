import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GetAllArticlesByCategoryId,
  GetAllArticlesByTypeId,
  GetAllArticlesIsPublic,
} from '../services/apiExplore';
import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import CustomLoaderWord from './CustomLoaderWord';
import { useNavigation } from '@react-navigation/native';
import FlatArticleItem from './FlatArticleItem';
const articleCategories = [
  { id: '2A72E9B9-1C47-4C09-9432-0B9A818D1C91', name: 'Teknoloji' },
  { id: '2808B910-75F2-4B72-ACC4-30AE3F2F2045', name: 'Ekonomi' },
  { id: 'B895620D-AE7F-48A6-97F1-4CFDD86ABEB9', name: 'Politika' },
  { id: 'B8684775-AA04-424D-BBA0-51CA72071FE3', name: 'Doğa' },
  { id: 'BDCDC16B-2C71-44F2-AC77-6D8170E109BE', name: 'Eğlence' },
  { id: '8853A796-6D96-4AD8-A7FB-7D5A971C511D', name: 'Sanat' },
  { id: '37463BCE-BB6B-4EA2-BC4D-8DFB02EB79D5', name: 'Sağlık' },
  { id: 'C2B6062F-498A-45CA-8AB4-8F9E7E47A7E7', name: 'Hayvanlar' },
  { id: '712F2E1C-64F7-47FF-B4D5-A69981E06F70', name: 'Eğitim' },
  { id: '11684E42-C702-4B6E-B5C0-AE23567204EF', name: 'Edebiyat' },
  { id: '781091BC-F7F7-47EC-93D7-DCBFA74A0FCD', name: 'Yazılım' },
  { id: 'A12FF4E7-2586-4A4C-BEB4-E9A7992F7B50', name: 'Spor' },
];
const ExploreCategorySomeArticles = () => {
  const [randomArticle, setRandomArticle] = useState<any>(undefined);
  const getRandomArticle = () => {
    const randomIndex = Math.floor(Math.random() * articleCategories.length);
    return articleCategories[randomIndex];
  };
  useEffect(() => {
    setRandomArticle(getRandomArticle());
  }, []);
  const {
    data: SomeArticlesByCategoryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['SomeAllArticlesByCategoryId', randomArticle?.id],
    queryFn: () => GetAllArticlesByCategoryId(randomArticle?.id),
    enabled: !!randomArticle,
  });
  
  const navigation = useNavigation<any>();
  if (SomeArticlesByCategoryData?.length === 0) return null;
  return (
    <>
      <View className="mb-2">
        {/* Başlık ve Tümünü Göster */}
        <View className="mb-4 mt-6 flex flex-row  items-center justify-start px-4">
          <Text className="text-lg text-primary" style={{ fontFamily: 'Poppins-SemiBold' }}>
            {randomArticle?.name} Kategorisindeki Bazı Metinler
          </Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SomeArticlesByCategoryData?.slice(0, 8)}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlatArticleItem item={item} />}
        />
      </View>
    </>
  );
};

export default ExploreCategorySomeArticles;
