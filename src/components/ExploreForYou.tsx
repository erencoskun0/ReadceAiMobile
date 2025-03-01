import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetAllArticlesIsPublic } from '../services/apiExplore';
import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import CustomLoaderWord from './CustomLoaderWord';
import { useNavigation } from '@react-navigation/native';

const ExploreForYou = () => {
  const {
    data: AllArticlesIsPublicData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['AllArticlesIsPublic'],
    queryFn: () => GetAllArticlesIsPublic(),
  });
  const navigation = useNavigation<any>();
  return (
    <>
      {isLoading && <CustomLoaderWord />}
      <View className="mb-8">
        {/* Başlık ve Tümünü Göster */}
        <View className="mb-4 mt-6 flex flex-row  items-end justify-between px-4">
          <Text className="text-xl text-primary" style={{ fontFamily: 'Poppins-SemiBold' }}>
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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ArticleDetailScreen', { item });
              }}
              className="mr-4    h-96 w-80 flex-col justify-between rounded-2xl bg-white p-4  ">
              <View className="mb-3">
                <Image
                  className="  h-44 w-auto  rounded-2xl"
                  source={{ uri: 'https://i.ibb.co/tw7QGMhF/Untitled-design.png' }}
                />
              </View>
              <View className="mb-3 flex flex-row items-center overflow-hidden">
                {/* Görünen Kategoriler */}
                {Array.isArray(item?.categories) &&
                  item?.categories?.slice(0, 3).map((category: any, index: any) => (
                    <TouchableOpacity
                      key={category?.id}
                      className="mr-2 flex flex-row items-center">
                      <View className="rounded-full bg-secondary px-3 py-1">
                        <Text
                          className="text-xs text-primary"
                          style={{ fontFamily: 'Poppins-Medium' }}
                          numberOfLines={1}>
                          {category?.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}

                {/* Kalan Kategori Sayısı */}
                {Array.isArray(item?.categories) && item?.categories?.length > 3 && (
                  <View className="  flex flex-row items-center">
                    <View className="rounded-full bg-secondary px-3 py-1">
                      <Text
                        className="text-xs text-primary"
                        style={{ fontFamily: 'Poppins-Medium' }}
                        numberOfLines={1}>
                        +{item?.categories?.length - 3}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* İçerik Alanı */}
              <View className="flex-1">
                <View className="mb-2 flex flex-row items-start justify-between">
                  <Text
                    className="flex-1 text-lg text-primary"
                    style={{ fontFamily: 'Poppins-SemiBold' }}
                    numberOfLines={1}>
                    {item?.articleTitle}
                  </Text>
                  <TouchableOpacity className="ml-2 flex-row items-center gap-1 rounded-md bg-primary px-2 py-1">
                    <Ionicons name="school" size={16} color="white" />
                    <Text className="text-xs text-white" style={{ fontFamily: 'Poppins-Medium' }}>
                      {item?.langLevel?.langLevelName}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-1">
                  {' '}
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      color: '#4B5563',
                      lineHeight: 20,
                      flexShrink: 1,
                      maxHeight: 20 * 3,
                    }}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {item?.articleSummary}
                  </Text>
                </View>
              </View>

              {/* Alt Bilgi */}
              <View className="  flex flex-row items-center justify-between border-t border-secondary pt-2">
                <TouchableOpacity className="flex flex-row items-center">
                  <Ionicons name="book-outline" size={18} color="#000957" />
                  <Text
                    className="ml-2 text-sm text-primary"
                    style={{ fontFamily: 'Poppins-Medium' }}>
                    {item?.articleType?.articleTypeName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex-row items-center'>
                  <Ionicons name="language" size={16} color="#000957" />
                  <Text className="text-sm   text-primary" style={{ fontFamily: 'Poppins-Medium' }}>
                    {item?.language?.langName}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default ExploreForYou;
