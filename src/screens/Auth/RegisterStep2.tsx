import React, { useState } from 'react';
import * as Keychain from 'react-native-keychain';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation, useRoute } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, Feather } from '@expo/vector-icons';
import CustomHeader from '../../components/CustomHeader';
import { useDispatch } from 'react-redux';
import { userLogin, userRegister } from '../../Redux/Slices/authSlice';
import { AppDispatch } from '../../Redux/Store/store';
import { Toast } from 'toastify-react-native';
import { extractFirstErrorMessage } from '../../utils/extractErrorMessage';

type langType = {
  id: string;
  value: string;
  flag: string;
};
const analanguages: langType[] = [
  {
    id: 'BAF9C8D5-7C65-4BEF-B444-75691C41973C',
    value: 'Türkçe',
    flag: '🇹🇷',
  },
];
const hedeflanguages: langType[] = [
  {
    id: 'E831E529-7ACF-433A-BD4F-19707BDAE98C',
    value: 'İngilizce',
    flag: '🇬🇧',
  },
];

const RegisterStep2 = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { email, password, repPassword }: { email: string; password: string; repPassword: string } =
    route.params;
  const [username, setUsername] = useState('');
  const [nativeLang, setNativeLang] = useState<langType>({
    id: '',
    value: '',
    flag: '',
  });
  const [targetLang, setTargetLang] = useState<langType>({
    id: '',
    value: '',
    flag: '',
  });
  const dispatch = useDispatch<AppDispatch>();

  const handlerRegister = async () => {
    if (nativeLang.id && targetLang.id) {
      try {
        const response = await dispatch(
          userRegister({
            email: email,
            confirmPassword: repPassword,
            learningLanguageId: targetLang.id,
            nativeLanguageId: nativeLang.id,
            password: password,
            username: username,
          })
        );
        if (response.payload.message == 'Kullanıcı başarıyla kaydedildi.') {
          Toast.success('Kayıt Tamamlandı Giriş Yapılıyor');
          await dispatch(
            userLogin({ email: response.meta.arg.email, password: response.meta.arg.password })
          );
        }
        console.log(response);
      } catch (error: any) {
        console.log(error, 'dsvds');
        Toast.warn('Bilinmeyen bir hata oluştu!');
      }
    } else {
      Toast.warn('Dil seçimi boş olamaz');
    }
  };

  const renderItem = (item: any) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Text style={{ fontSize: 20, marginRight: 10 }}>{item.flag}</Text>
        <Text style={{ fontSize: 16 }}>{item.value}</Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      className="flex-1 bg-white">
      {' '}
      <CustomHeader
        onBackPress={() => {
          navigation.goBack();
        }}
        pt={'pt-[4]'}
        titleSize={'text-xl'}
      />
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-6">
          <View className=" flex-1  items-center justify-center">
            <View className="mb-4  items-center">
              <Text className="font-semibold text-3xl text-primary">Son Bir Adım Kaldı!</Text>
              <Text className="mt-4 font-sans text-lg text-primary">Hangi Diller Sana Uygun?</Text>
              <Text className=" mt-1 font-sans text-sm text-primary">
                (Bu seçimi daha sonra değiştirebilirsin)
              </Text>
            </View>

            <View className="  w-full  ">
              <View className="flex-row items-center justify-between gap-4 space-x-4 p-4">
                <SelectDropdown
                  data={analanguages}
                  onSelect={(selectedItem) => setNativeLang(selectedItem)}
                  renderButton={(selectedItem, isOpened) => (
                    <View className="flex-1 flex-row items-center justify-between rounded-xl bg-primary p-3 shadow-lg shadow-primary/30">
                      <Text className="font-medium text-base text-white">
                        {selectedItem ? (
                          <View className="flex-row items-center gap-2 ">
                            <Text className="font-medium text-base   text-white">
                              {selectedItem?.flag}
                            </Text>
                            <Text className="font-medium text-base text-white">
                              {selectedItem?.value}
                            </Text>
                          </View>
                        ) : (
                          <View className="  flex-row items-center  ">
                            <Text className="font-medium text-base text-white">Ana Dil</Text>
                          </View>
                        )}
                      </Text>
                      <Ionicons
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#98D8EF"
                      />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => (
                    <View
                      className={`  rounded-lg   ${isSelected ? 'bg-secondary/20' : 'bg-white'}`}
                      style={{ borderBottomWidth: 1, borderBottomColor: '#98D8EF40' }}>
                      <View className="flex-row items-center gap-2 space-x-3 p-3">
                        <Text className="text-2xl">{item.flag}</Text>
                        <Text className="font-medium text-base text-primary">{item.value}</Text>
                      </View>
                    </View>
                  )}
                  dropdownStyle={{
                    borderRadius: 16,
                    backgroundColor: '#FFF',
                    marginTop: 8,
                    shadowColor: '#000957',
                    shadowRadius: 20,
                    shadowOpacity: 0.1,
                    elevation: 5,
                  }}
                  showsVerticalScrollIndicator={false}
                  statusBarTranslucent={true}
                  buttonStyle={{ width: '100%' }}
                  rowStyle={{ borderBottomWidth: 0 }}
                />

                {/* Hedef Dil Seçimi */}
                <SelectDropdown
                  data={hedeflanguages}
                  onSelect={(selectedItem) => setTargetLang(selectedItem)}
                  renderButton={(selectedItem, isOpened) => (
                    <View className="flex-1 flex-row items-center justify-between rounded-xl bg-primary p-3 shadow-lg shadow-primary/30">
                      <Text className="font-medium text-base text-white">
                        {selectedItem ? (
                          <View className="flex-row items-center gap-2 ">
                            <Text className="font-medium text-base   text-white">
                              {selectedItem?.flag}
                            </Text>
                            <Text className="font-medium text-base text-white">
                              {selectedItem?.value}
                            </Text>
                          </View>
                        ) : (
                          <View className="flex-row items-center gap-2 ">
                            <Text className="font-medium text-base text-white">Hedeflenen Dil</Text>
                          </View>
                        )}
                      </Text>
                      <Ionicons
                        name={isOpened ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color="#98D8EF"
                      />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => (
                    <View
                      className={`  rounded-lg   ${isSelected ? 'bg-secondary/20' : 'bg-white'}`}
                      style={{ borderBottomWidth: 1, borderBottomColor: '#98D8EF40' }}>
                      <View className="flex-row items-center gap-2 space-x-3 p-3">
                        <Text className="text-2xl">{item.flag}</Text>
                        <Text className="font-medium text-base text-primary">{item.value}</Text>
                      </View>
                    </View>
                  )}
                  dropdownStyle={{
                    borderRadius: 16,
                    backgroundColor: '#FFF',
                    marginTop: 8,
                    shadowColor: '#000957',
                    shadowRadius: 20,
                    shadowOpacity: 0.1,
                    elevation: 5,
                  }}
                  showsVerticalScrollIndicator={false}
                  statusBarTranslucent={true}
                  buttonStyle={{ width: '100%' }}
                  rowStyle={{ borderBottomWidth: 0 }}
                />
              </View>
              <View className=" mt-4 flex-row items-center justify-between   pb-8 ">
                <View className="flex-col items-start gap-4 ">
                  {nativeLang.id && <Text className=" font-medium text-lg">Ana Diliniz:</Text>}{' '}
                  {targetLang.id && (
                    <Text className=" text-left font-medium text-lg">Hedeflediğiniz Dil:</Text>
                  )}
                </View>
                <View className="flex-col items-start gap-4 ">
                  {nativeLang.id && (
                    <Text className=" font-medium text-lg ">
                      {nativeLang.flag} {nativeLang.value}
                    </Text>
                  )}
                  {targetLang.id && (
                    <Text className=" font-medium text-lg">
                      {targetLang.flag} {targetLang.value}
                    </Text>
                  )}
                </View>
              </View>
              <View className="mb-6 flex-row items-center border-b border-primary pb-2">
                <Feather name="user" size={24} color="#000957" />
                <TextInput
                  placeholder="Kullanıcı Adı"
                  placeholderTextColor="#000957"
                  className="ml-3 flex-1 py-1 font-sans text-lg text-primary"
                  keyboardType="email-address"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{
              shadowColor: '#000957',
              shadowRadius: 20,
              shadowOpacity: 0.9,
              elevation: 7,
            }}
            className="relative mb-24 mt-auto flex-row items-center justify-center rounded-xl bg-primary p-4"
            onPress={() => {
              handlerRegister();
            }}>
            <Text className="font-semibold text-lg text-white">Kayıt Ol</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="  absolute bottom-2 left-1/2 -translate-x-1/2  items-center rounded-xl   p-2"
            onPress={async () => {
              try {
                await Keychain.setGenericPassword('guest', 'true');
                console.log('Guest mode kaydedildi!');
                navigation.navigate('Keşfet');
              } catch (error) {
                console.log('Hata:', error);
              }
            }}>
            <Text className="text-md font-semibold text-primary underline">
              Misafir Olarak Devam Et
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterStep2;
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 100,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
