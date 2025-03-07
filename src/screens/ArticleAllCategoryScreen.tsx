import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GetAllArticlesByCategoryId, GetAllArticlesByLangLevel } from '../services/apiExplore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import CustomHeader from '../components/CustomHeader';
import ArticleItem from '../components/ArticleItem';

const ArticleAllCategoryScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { categoryId, categoryName }: any = route.params;
  const {
    data: AllArticlesByCategoryIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['AllArticlesByCategoryId', categoryId],
    queryFn: () => GetAllArticlesByCategoryId(categoryId),
    enabled: !!categoryId,
  });

  return (
    <>
      <CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={`${categoryName} Kategorisindeki Tüm Metinler`}
        pt={'pt-[10]'}
        titleSize={'text-md'}
      />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View className=" mt-2 flex  flex-col  items-center gap-4 pb-4">
            {AllArticlesByCategoryIdData?.map((item: any) => <ArticleItem item={item} />)}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ArticleAllCategoryScreen;
