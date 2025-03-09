import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import * as Keychain from 'react-native-keychain';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Redux/Store/store';
import { guestLogOut } from '../Redux/Slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const logOutProfile = async () => {
    await dispatch(guestLogOut());
    navigation.navigate('Auth');
  };
  return (
    <View>
      <CustomHeader title="Profilim" pt={'pt-[0]'} titleSize={'text-2xl'} />
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={logOutProfile} className=" flex-1 items-center justify-center ">
        <Text className="bg-red-600 p-4 font-semibold text-white">Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
