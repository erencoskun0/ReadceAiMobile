import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import ExploreForYou from '../components/ExploreForYou';
import { getGreeting } from '../utils/getGreeting';
import ExploreTypeSomeArticles from '../components/ExploreTypeSomeArticles';
import ExploreCategorySomeArticles from '../components/ExploreCategorySomeArticles';
const ExploreScreen = () => {
  return (
    <View className='flex-1'>
      <CustomHeader title={getGreeting()} pt={'pt-[25]'} titleSize={'text-3xl'} />
      <ScrollView className="   ">
        <ExploreForYou />
        <ExploreCategorySomeArticles />
        <ExploreTypeSomeArticles />
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;
