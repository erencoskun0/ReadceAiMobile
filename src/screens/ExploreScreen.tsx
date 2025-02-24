import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
const ExploreScreen = () => {
  return (
    <View>
      <CustomHeader title="Explore Screen" logo={true} />
      <Ionicons name="grid-outline" size={50} />
    </View>
  );
};

export default ExploreScreen;
