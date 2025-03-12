import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { GetAllArticlesIsPublicType } from '../types/apiExploreType';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import CustomHeader from '../components/CustomHeader';
import Modal from 'react-native-modal';
import { BlurView } from 'expo-blur';
import CustomToUpModal from '../components/CustomToUpModal';
import { AntDesign } from '@expo/vector-icons';
import WordCard from '../components/WordCard';
import WordCardContainer from '../components/WordCardContainer';
import PopoverView from '../components/PopoverView';
import PopoverContainer from '../components/PopoverContainer';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AddRemoveArticlePuan, GetArticlePuanInfo } from '../services/apiArticleDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/store';
import { Toast } from 'toastify-react-native';
const { height: DEVICE_HEIGHT } = Dimensions.get('window');
const ArticleDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { item }: { item: GetAllArticlesIsPublicType } = route.params;
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const { userId } = useSelector((state: RootState) => state.authUser);
  const { data: articlePuanInfoData, refetch } = useQuery({
    queryKey: ['articlePuanInfo', item.id, userId],
    queryFn: () => GetArticlePuanInfo(userId ? userId : null, item.id),
    enabled: !!item.id,
  });
  const { mutate: updateArticlePuanPost, isPending } = useMutation({
    mutationFn: (data: { userId: string; articleId: string }) =>
      AddRemoveArticlePuan(data.userId, data.articleId),
    mutationKey: ['updateArticlePuan'],
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {
      console.error('Güncelleme yapılırken hata oluştu:', error);
    },
  });

  return (
    <View>
      <CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        pt={'pt-[0]'}
        titleSize={'text-2xl'}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-4">
          {' '}
          <Image
            source={{ uri: item?.articleImage }}
            className="h-64 w-full rounded-3xl   "
            resizeMode="cover"
          />
        </View>

        <View className="mt-1 px-4">
          <View className="my-4 flex-row-reverse  flex-wrap items-center justify-between  ">
            <View className="flex-row-reverse items-center gap-1">
              {' '}
              <TouchableOpacity
                onPress={() => {
                  if (userId) {
                    updateArticlePuanPost({ userId: userId, articleId: item.id });
                  } else {
                    Toast.warn('Giriş Yapmalısın!');
                  }
                }}
                className=" flex-row items-center rounded-full bg-primary/10 p-2">
                {/* <AntDesign name="staro" size={18} color="#000957" /> */}
                <AntDesign
                  name={articlePuanInfoData?.isAddedUser ? 'star' : 'staro'}
                  size={18}
                  color={articlePuanInfoData?.isAddedUser ? 'orange' : '#000957'}
                />
                <Text className="font-PoppinsMedium ml-1 text-sm text-primary">
                  {articlePuanInfoData?.articlePuan
                    ? articlePuanInfoData?.articlePuan
                    : item.articlePuan}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mr-3 flex-row items-center rounded-full bg-primary/10 p-2"
                onPress={() => setIsSummaryVisible(true)}>
                <Ionicons name="document-text" size={18} color="#000957" />
                <Text className="font-PoppinsMedium ml-1 text-sm text-primary">Özet</Text>
              </TouchableOpacity>
            </View>

            <View className=" flex-row items-center gap-2">
              <TouchableOpacity className="flex-row items-center">
                <Ionicons name="language" size={16} color="#000957" />
                <Text className="text-md   text-primary" style={{ fontFamily: 'Poppins-Medium' }}>
                  {item?.language?.langName}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="ml-2 flex-row items-center gap-1 rounded-md bg-primary px-2 py-1">
                <Ionicons name="school" size={16} color="white" />
                <Text className="text-xs text-white" style={{ fontFamily: 'Poppins-Medium' }}>
                  {item?.langLevel?.langLevelName}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className=" mb-4 px-0">
            {Array.isArray(item?.categories) && item?.categories?.length > 0 ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 12 }}>
                {Array.isArray(item.categories) &&
                  item?.categories?.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      className="flex-row items-center space-x-2 rounded-2xl bg-white px-4 py-2  ">
                      <Text
                        className="font-PoppinsSemiBold text-sm text-primary"
                        numberOfLines={1}
                        style={{ maxWidth: 120 }}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            ) : (
              <View className="flex-row items-center justify-center rounded-xl bg-secondary/10 p-4">
                <Ionicons name="information-circle" size={20} color="#98D8EF" />
                <Text className="font-PoppinsMedium ml-2 text-secondary">
                  Kategori bilgisi bulunmamaktadır
                </Text>
              </View>
            )}
          </View>

          <View className="  flex-row flex-wrap leading-8">
            {item.articleTitle.split(' ').map((word, index) => (
              <PopoverView
                word={word}
                key={index}
                textStyle={'font-medium text-3xl text-primary'}
              />
            ))}
          </View>
        </View>
        <View className=" mt-1 flex-row items-center gap-2 px-4">
          <Ionicons name="reader-outline" size={20} color="#000957" />
          <Text className="Medium font-sans text-primary">
            Okuma Süresi: {Math.ceil(item.articleContent.length / 400)} dakika
          </Text>
        </View>
        {isRead ? (
          <PopoverContainer content={item?.articleContent} />
        ) : (
          <TouchableOpacity
            onPress={() => setIsRead(true)}
            className="mx-auto mt-10 w-[80%] rounded-full bg-red-500 py-2">
            <Text className="text-center font-semibold text-lg text-white ">
              {' '}
              Şimdi Okumaya Başla
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <CustomToUpModal isVisible={isSummaryVisible} setIsVisible={setIsSummaryVisible}>
        <ScrollView className="px-6 pb-8" showsVerticalScrollIndicator={false}>
          <Text className="mb-3 text-center font-semibold text-xl text-primary">Özet</Text>
          <View className="  flex-row flex-wrap leading-8">
            {item.articleTitle.split(' ').map((word, index) => (
              <PopoverView
                word={word}
                key={index}
                textStyle={'font-medium text-3xl text-primary'}
              />
            ))}
          </View>
          <View className="mt-2 flex-row flex-wrap leading-8">
            {item.articleSummary
              ?.split(' ')
              .map((word, index) => (
                <PopoverView
                  word={word}
                  key={index}
                  textStyle={'font-sans text-lg leading-6 text-gray-800'}
                />
              ))}
          </View>
        </ScrollView>
      </CustomToUpModal>
    </View>
  );
};

export default ArticleDetailScreen;
