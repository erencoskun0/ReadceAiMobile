import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import * as Keychain from 'react-native-keychain';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Redux/Store/store';
import { guestLogOut, LogOut } from '../Redux/Slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';

// MenuItem bileşeni için tip tanımı
type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  badge?: string | number | null;
  color?: string;
};

const ProfileScreen = () => {
  const { role, userId, userEmail } = useSelector((state: RootState) => state.authUser);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState('profile');

  const logOutProfile = async () => {
    await dispatch(guestLogOut());
    await dispatch(LogOut());
  };

  const ProfileCard = () => (
    <View className="mb-4 rounded-xl bg-white p-4 shadow-md">
      <View className="flex-row items-center">
        <View className="mr-4 h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-blue-100">
          {userEmail ? (
            <Text className="font-bold text-3xl text-blue-600">
              {userEmail.charAt(0).toUpperCase()}
            </Text>
          ) : (
            <Ionicons name="person" size={32} color="#0000ff" />
          )}
        </View>
        <View className="flex-1">
          <Text className="font-bold text-xl text-[#000957]">
            {userEmail ? userEmail.split('@')[0] : 'Kullanıcı'}
          </Text>
          <Text className="font-medium text-gray-500">{userEmail || 'Misafir'}</Text>
          {role && (
            <Text className="mt-1 self-start rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-600">
              {role}
            </Text>
          )}
        </View>
      </View>
    </View>
  );

  const MenuItem = ({ icon, title, onPress, badge = null, color = '#0000ff' }: MenuItemProps) => (
    <TouchableOpacity
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-xl bg-white p-4 shadow-sm">
      <View className="mr-4" style={{ width: 30, alignItems: 'center' }}>
        {icon}
      </View>
      <Text className="flex-1 font-medium text-lg text-[#000957]">{title}</Text>
      {badge && (
        <View className="rounded-full bg-blue-100 px-2 py-0.5">
          <Text className="font-medium text-blue-600">{badge}</Text>
        </View>
      )}
      <MaterialIcons name="keyboard-arrow-right" size={24} color="#98D8EF" />
    </TouchableOpacity>
  );

  const CompletedArticles = () => (
    <View className="mt-4">
      <Text className="mb-4 font-bold text-xl text-[#000957]">Tamamladığım Makaleler</Text>
      <View className="mb-3 rounded-xl bg-white p-4 shadow-md">
        <Text className="py-4 text-center italic text-gray-400">
          Henüz tamamlanmış makale bulunmamaktadır.
        </Text>
      </View>
    </View>
  );

  const ProgressSection = () => (
    <View className="mb-6 mt-4">
      <Text className="mb-4 font-bold text-xl text-[#000957]">Dil Öğrenme İlerlemesi</Text>
      <View className="rounded-xl bg-white p-4 shadow-md">
        <View className="mb-2 flex-row justify-between">
          <Text className="font-medium text-[#000957]">İngilizce</Text>
          <Text className="font-semibold text-blue-600">%25</Text>
        </View>
        <View className="h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-blue-600" style={{ width: '25%' }} />
        </View>

        <View className="mb-2 mt-4 flex-row justify-between">
          <Text className="font-medium text-[#000957]">Öğrenilen Kelimeler</Text>
          <Text className="font-semibold text-blue-600">38</Text>
        </View>

        <View className="mt-4 flex-row justify-between">
          <View className="items-center">
            <Text className="font-bold text-xl text-blue-600">12</Text>
            <Text className="font-medium text-[#000957]">Makale</Text>
          </View>

          <View className="items-center">
            <Text className="font-bold text-xl text-blue-600">8</Text>
            <Text className="font-medium text-[#000957]">Saat</Text>
          </View>

          <View className="items-center">
            <Text className="font-bold text-xl text-blue-600">5</Text>
            <Text className="font-medium text-[#000957]">Gün</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <CustomHeader title="Profilim" pt={'pt-[0]'} titleSize={'text-2xl'} />

      <ScrollView className="flex-1 px-4 pt-4">
        <ProfileCard />

        <ProgressSection />

        <Text className="mb-4 font-bold text-xl text-[#000957]">Menü</Text>

        <MenuItem
          icon={<Ionicons name="book-outline" size={24} color="#0000ff" />}
          title="Tamamladığım Makaleler"
          onPress={() => {}}
          badge="3"
        />

        <MenuItem
          icon={<FontAwesome5 name="bookmark" size={22} color="#0000ff" />}
          title="Kaydedilenler"
          onPress={() => {}}
        />

        <MenuItem
          icon={<Ionicons name="stats-chart" size={24} color="#0000ff" />}
          title="İstatistiklerim"
          onPress={() => {}}
        />

        <MenuItem
          icon={<Ionicons name="settings-outline" size={24} color="#0000ff" />}
          title="Ayarlar"
          onPress={() => {}}
        />

        <MenuItem
          icon={<Feather name="help-circle" size={24} color="#0000ff" />}
          title="Yardım ve Destek"
          onPress={() => {}}
        />

        <TouchableOpacity
          onPress={logOutProfile}
          className="mb-6 mt-4 flex-row items-center rounded-xl bg-white p-4 shadow-sm">
          <View className="mr-4" style={{ width: 30, alignItems: 'center' }}>
            <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
          </View>
          <Text className="flex-1 font-medium text-lg text-[#FF3B30]">Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
