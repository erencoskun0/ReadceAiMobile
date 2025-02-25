import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import ExploreForYou from '../components/ExploreForYou';
import { getGreeting } from '../utils/getGreeting';
const ExploreScreen = () => {
  return (
    <View>
      <CustomHeader title={getGreeting()} pt={'pt-[25]'} titleSize={'text-3xl'} />

      <ExploreForYou />
    </View>
  );
};

export default ExploreScreen;
