import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { GetAllArticlesByLangId } from '../services/apiExplore';
import CustomHeader from '../components/CustomHeader';
import ArticleItem from '../components/ArticleItem';

const ArticleAllLangScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { langId, langName }: any = route.params;
  const {
    data: AllArticlesByLangIdData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['AllArticlesByLangId', langId],
    queryFn: () => GetAllArticlesByLangId(langId),
    enabled: !!langId,
  });
  return (
    <>
      <CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={`${langName} Dilindeki Metinler`}
        pt={'pt-[10]'}
        titleSize={'text-md'}
      />

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View className=" mt-2 flex flex-col items-center  gap-4 pb-4">
            {AllArticlesByLangIdData?.map((item: any) => <ArticleItem item={item} />)}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ArticleAllLangScreen;
