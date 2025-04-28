import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetAllArticlesIsPublic } from '../services/apiExplore';
import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import CustomLoaderWord from './CustomLoaderWord';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FlatArticleItem from './FlatArticleItem';

const ExploreForYou = () => {
  const {
    data: AllArticlesIsPublicData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['AllArticlesIsPublic'],
    queryFn: () => GetAllArticlesIsPublic(),
  });
  const navigation = useNavigation<any>();
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );
  return (
    <>
      {isLoading && <CustomLoaderWord />}
      <View className="mb-2 ">
        {/* Başlık ve Tümünü Göster */}
        <View className="mb-4 mt-6 flex flex-row  items-end justify-between px-4">
          <Text className="text-lg text-primary" style={{ fontFamily: 'Poppins-SemiBold' }}>
            Sana Özel Önerilerimiz
          </Text>
          <TouchableOpacity className="flex flex-row items-center justify-end">
            <Text className="mr-1 text-primary" style={{ fontFamily: 'Poppins-Medium' }}>
              Tümünü göster
            </Text>
            <AntDesign name="arrowright" size={16} color="#000957" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={AllArticlesIsPublicData?.slice(0, 8)}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlatArticleItem item={item} />}
        />
      </View>
    </>
  );
};

export default ExploreForYou;
