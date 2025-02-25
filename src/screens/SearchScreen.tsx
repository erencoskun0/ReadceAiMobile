import { View, Text } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';

const SearchScreen = () => {
  return (
    <View>
      <CustomHeader title="Ara" pt={'pt-[0]'} titleSize={'text-2xl'} />
      <Text>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;
