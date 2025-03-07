import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const ArticleItem = ({ item }: any) => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ArticleDetailScreen', { item });
      }}
      className="mx-auto      h-96 w-[93%] flex-col justify-between rounded-2xl bg-white p-4  ">
      <View className="mb-3">
        <Image className="  h-44 w-auto  rounded-2xl" source={{ uri: item?.articleImage }} />
      </View>
      <View className="mb-3 flex flex-row items-center">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item?.categories}
          keyExtractor={(category) => category?.id}
          contentContainerStyle={{ paddingRight: 12 }}
          renderItem={({ item: category }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ArticleAllCategoryScreen', {
                  categoryId: category?.id,
                  categoryName: category?.name,
                });
              }}
              className="mr-2 flex flex-row items-center"
              accessibilityRole="button">
              <View className="rounded-full bg-secondary px-3 py-1">
                <Text
                  className="text-xs text-primary"
                  style={{ fontFamily: 'Poppins-Medium' }}
                  numberOfLines={1}>
                  {category?.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ArticleAllLangLevelScreen', {
                langId: item?.language?.langId,
                langLevelId: item?.langLevel?.id,
                langName: item?.language?.langName,
                langLevelName: item?.langLevel?.langLevelName,
              });
            }}
            className="ml-2 flex-row items-center gap-1 rounded-md bg-primary px-2 py-1">
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
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ArticleAllTypeScreen', {
              typeId: item?.articleType?.id,
              typeName: item?.articleType?.articleTypeName,
            });
          }}
          className="flex flex-row items-center">
          <Ionicons name="book-outline" size={18} color="#000957" />
          <Text className="ml-2 text-sm text-primary" style={{ fontFamily: 'Poppins-Medium' }}>
            {item?.articleType?.articleTypeName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ArticleAllLangScreen', {
              langId: item?.language?.langId,
              langName: item?.language?.langName,
            });
          }}
          className="flex-row items-center">
          <Ionicons name="language" size={16} color="#000957" />
          <Text className="text-sm   text-primary" style={{ fontFamily: 'Poppins-Medium' }}>
            {item?.language?.langName}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleItem;
