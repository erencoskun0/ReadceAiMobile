import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import * as Keychain from 'react-native-keychain';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store/store';
import { guestLogOut, LogOut } from '../Redux/Slices/authSlice';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { role, userId, userEmail } = useSelector((state: RootState) => state.authUser);

  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const logOutProfile = async () => {
    await dispatch(guestLogOut());
    await dispatch(LogOut());
  };
  return (
    <View>
      <CustomHeader title="Profilim" pt={'pt-[0]'} titleSize={'text-2xl'} />
      <Text>ProfileScreen</Text>
      <TouchableOpacity onPress={logOutProfile} className=" flex-1 items-center justify-center ">
        <Text className="bg-red-600 p-4 font-semibold text-white">Çıkış Yap</Text>
      </TouchableOpacity>
      <Text className='font-medium text-lg'>Email= {userEmail}</Text>
      <Text className='font-medium text-lg'>UserId= {userId}</Text>
      <Text className='font-medium text-lg'>Role= {role}</Text>
    </View>
  );
};

export default ProfileScreen;
