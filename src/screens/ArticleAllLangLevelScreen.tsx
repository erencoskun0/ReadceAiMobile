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
import { GetAllArticlesByLangLevel } from '../services/apiExplore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import CustomHeader from '../components/CustomHeader';
import ArticleItem from '../components/ArticleItem';
const ArticleAllLangLevelScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { langId, langLevelId, langName, langLevelName }: any = route.params;
  const {
    data: AllArticlesByLangLevelData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['AllArticlesByLangLevel', langLevelId, langId],
    queryFn: () => GetAllArticlesByLangLevel(langLevelId, langId),
    enabled: !!langLevelId && !!langId,
  });

  return (
    <>
      <CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        title={`${langName} Dilindeki Tüm ${langLevelName} Seviye Metinler`}
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
            {AllArticlesByLangLevelData?.map((item: any) => <ArticleItem item={item} />)}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default ArticleAllLangLevelScreen;
