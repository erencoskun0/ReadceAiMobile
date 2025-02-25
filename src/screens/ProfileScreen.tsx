import { View, Text } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';

const ProfileScreen = () => {
  return (
    <View>
      <CustomHeader title="Profilim" pt={'pt-[0]'} titleSize={'text-2xl'} />
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;
