import React, { useState } from 'react';
import * as Keychain from 'react-native-keychain';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/Store/store';
import { checkGuestAuth, guestAuth, userLogin } from '../../Redux/Slices/authSlice';
import { Toast } from 'toastify-react-native';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handlerLogin = async () => {
    try {
      console.log('girdi');
      const loginResponse = await dispatch(userLogin({ email: email, password: password }));
       
    } catch (error: any) {
      console.log(error, 'dsvds');
      Toast.warn('Bilinmeyen bir hata oluştu!');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-6">
          <View className="   flex-1 items-center justify-center">
            <View className="mb-4 mt-auto items-center">
              <Image source={require('../../../assets/logo.png')} className="mb-2 h-32 w-48    " />
              <Text className="font-semibold text-3xl text-primary">ReadceAi</Text>
              <Text className="  font-medium text-primary">Dil Öğrenmenin Kolay Yolu</Text>
            </View>

            <View className="mb-6 w-full">
              <View className="mb-6 flex-col gap-3">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-xl border border-gray-300 p-2">
                  <Ionicons name="logo-google" size={22} color="#DB4437" />
                  <Text className="ml-2   font-medium text-primary">Google ile devam et</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center rounded-xl border border-gray-300 p-2">
                  <Ionicons name="logo-apple" size={22} color="#000" />
                  <Text className="ml-2   font-medium text-primary">Apple ile devam et</Text>
                </TouchableOpacity>
              </View>
              <View className="mb-6 flex-row items-center border-b border-primary pb-2">
                <Ionicons name="mail-outline" size={24} color="#000957" />
                <TextInput
                  placeholder="E-posta"
                  placeholderTextColor="#000957"
                  className="ml-3 flex-1 py-1 font-sans text-lg text-primary"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View className="mb-2 flex-row items-center border-b border-primary pb-2">
                <Ionicons name="lock-closed-outline" size={24} color="#000957" />
                <TextInput
                  placeholder="Şifre"
                  placeholderTextColor="#000957"
                  className="ml-3 flex-1 py-1 font-sans text-lg text-primary"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#000957"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity className=" mb-4" onPress={() => navigation.navigate('Home')}>
                <Text className="text-md text-right font-semibold text-primary  ">
                  Şifremi Unuttum
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{
                shadowColor: '#000957',
                shadowRadius: 20,
                shadowOpacity: 0.9,
                elevation: 7,
              }}
              className="relative mb-24 mt-auto  w-full flex-row items-center justify-center rounded-xl bg-primary p-4"
              onPress={() => handlerLogin()}>
              <Text className="font-semibold text-lg text-white">Giriş Yap</Text>
            </TouchableOpacity>

            <View className="absolute bottom-8 left-1/2 mb-6 -translate-x-1/2 flex-row items-center justify-center">
              <Text className="font-sans   text-gray-500">Hesabın yok mu? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text className="font-semibold   text-primary"> Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="  absolute bottom-2 left-1/2 -translate-x-1/2  items-center rounded-xl   p-2"
            onPress={async () => {
              await dispatch(guestAuth());
              await dispatch(checkGuestAuth());
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

export default LoginScreen;
