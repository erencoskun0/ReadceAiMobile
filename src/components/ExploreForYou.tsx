import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetAllArticlesIsPublic } from '../services/apiExplore';
import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import axios from 'axios';

const ExploreForYou = () => {
  const {
    data: AllArticlesIsPublicData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['AllArticlesIsPublic'],
    queryFn: () => GetAllArticlesIsPublic(),
  });

  return (
    <View>
      <View className="mb-1 mt-5 flex flex-row items-center justify-between px-3">
        <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Sana Özel Önerilerimiz</Text>
        <TouchableOpacity>
          <Text>Tümünü göster</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center">
        <FlatList
          data={AllArticlesIsPublicData} // `data` olarak doğrudan diziyi kullan
          horizontal
          renderItem={({ item }: { item: GetAllArticlesIsPublicType }) => (
            <View key={item.id} className="mx-2 w-96 rounded-lg bg-secondary p-4">
              <Text className="text-white">{item.articleTitle}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default ExploreForYou;
