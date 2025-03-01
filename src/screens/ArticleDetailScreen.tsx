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
const { height: DEVICE_HEIGHT } = Dimensions.get('window');
const ArticleDetailScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { item }: { item: GetAllArticlesIsPublicType } = route.params;
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

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
            source={{ uri: 'https://i.ibb.co/tw7QGMhF/Untitled-design.png' }}
            className="h-64 w-full rounded-3xl   "
            resizeMode="cover"
          />
        </View>

        <View className="mt-1 px-4">
          <View className="my-4 flex-row-reverse  flex-wrap items-center justify-between  ">
            <View className="flex-row-reverse items-center gap-1">
              {' '}
              <TouchableOpacity className=" flex-row items-center rounded-full bg-primary/10 p-2">
                {/* <AntDesign name="staro" size={18} color="#000957" /> */}
                <AntDesign name="star" size={18} color="#000957" />
                <Text className="font-PoppinsMedium ml-1 text-sm text-primary">129</Text>
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

          <Text className="Bold text-3xl font-medium   text-primary">{item.articleTitle}</Text>
        </View>
        <View className=" mt-1 flex-row items-center gap-2 px-4">
          <Ionicons name="reader-outline" size={20} color="#000957" />
          <Text className="Medium font-sans text-primary">
            Okuma Süresi: {Math.ceil(item.articleContent.length / 400)} dakika
          </Text>
        </View>
        <View className="mt-4 px-4">
          <View className="h-full flex-row flex-wrap leading-8">
            {item.articleContent.split(' ').map((word, index) => (
              <PopoverView key={index} word={word} />
            ))}
          </View>
        </View>
      </ScrollView>
      <CustomToUpModal isVisible={isSummaryVisible} setIsVisible={setIsSummaryVisible}>
        <ScrollView className="px-6 pb-8" showsVerticalScrollIndicator={false}>
          <Text className="mb-3 text-center text-xl font-semibold text-primary">Özet</Text>
          <Text className="mb-1 text-2xl font-medium text-primary">{item.articleTitle}</Text>
          <Text className="font-sans text-lg leading-6 text-gray-800">{item.articleSummary}</Text>
        </ScrollView>
      </CustomToUpModal>
    </View>
  );
};

export default ArticleDetailScreen;
