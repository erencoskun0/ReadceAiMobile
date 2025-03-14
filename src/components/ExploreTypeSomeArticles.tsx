import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetAllArticlesByTypeId, GetAllArticlesIsPublic } from '../services/apiExplore';
import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import CustomLoaderWord from './CustomLoaderWord';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FlatArticleItem from './FlatArticleItem';
const articleTypes = [
  { id: '591CB9F4-B8D2-462C-AE7E-241A46E88186', name: 'Hikaye' },
  { id: 'DAE4E925-0B57-4255-AF8C-41A2B535B404', name: 'Makale' },
  { id: '73C7F1F3-F32C-42D5-A86B-4C950D0E05CA', name: 'Otobiyografi' },
  { id: '526BCE86-5085-40D5-86E9-4E431B1D7B8C', name: 'Biyografi' },
  { id: '71503C0B-0D4F-4BB1-8D02-A1E3B3892681', name: 'Felsefi Yazı' },
  { id: '6D58128A-ADCD-4B60-A0B7-B830B861002F', name: 'Roman' },
  { id: '7409D99D-EC5F-4922-924D-BA9E38D8B6C0', name: 'Deneme' },
  { id: '493CAF2F-EB16-45FF-8729-DD388E7D0796', name: 'Şiir' },
  { id: '214072E9-834C-46F7-AFDA-FC3971DE7551', name: 'Araştırma' },
];
const ExploreTypeSomeArticles = () => {
  const [randomArticle, setRandomArticle] = useState<any>(undefined);
  const getRandomArticle = () => {
    const randomIndex = Math.floor(Math.random() * articleTypes.length);
    return articleTypes[randomIndex];
  };
  useEffect(() => {
    setRandomArticle(getRandomArticle());
  }, []);
  const {
    data: SomeArticlesByTypeData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['SomeArticlesByTypeId', randomArticle?.id],
    queryFn: () => GetAllArticlesByTypeId(randomArticle?.id),
    enabled: !!randomArticle,
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  const navigation = useNavigation<any>();
  if (SomeArticlesByTypeData?.length === 0) return null;
  return (
    <>
      <View className="mb-2">
        {/* Başlık ve Tümünü Göster */}
        <View className="mb-4 mt-6 flex flex-row  items-center justify-start px-4">
          <Text className="text-lg text-primary" style={{ fontFamily: 'Poppins-SemiBold' }}>
            {randomArticle?.name} Türünde Bazı Metinler
          </Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={SomeArticlesByTypeData?.slice(0, 8)}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlatArticleItem item={item} />}
        />
      </View>
    </>
  );
};

export default ExploreTypeSomeArticles;
