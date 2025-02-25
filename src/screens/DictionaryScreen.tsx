import { View, Text } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';

const DictionaryScreen = () => {
  return (
    <View>
      <CustomHeader title="Sözlüğüm" pt={'pt-[0]'} titleSize={'text-2xl'} />
      <Text>DictionaryScreen</Text>
    </View>
  );
};

export default DictionaryScreen;
