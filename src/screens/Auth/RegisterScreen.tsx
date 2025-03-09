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
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Toast } from 'toastify-react-native';
import { isValidEmail } from '../../utils/emailControl';

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepPassword, setShowRepPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-6">
          <View className="  flex-1 items-center justify-center">
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
              <View className="mb-6 flex-row items-center border-b border-primary pb-2">
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
              <View className="mb-6 flex-row items-center border-b border-primary pb-2">
                <Ionicons name="lock-closed-outline" size={24} color="#000957" />
                <TextInput
                  placeholder="Şifre Tekrarı"
                  placeholderTextColor="#000957"
                  className="ml-3 flex-1 py-1 font-sans text-lg text-primary"
                  secureTextEntry={!showRepPassword}
                  value={repPassword}
                  onChangeText={setRepPassword}
                />
                <TouchableOpacity onPress={() => setShowRepPassword(!showRepPassword)}>
                  <Ionicons
                    name={showRepPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#000957"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              className="relative mb-24 mt-auto  w-full flex-row items-center justify-center rounded-xl bg-primary p-4"
              onPress={() => {
                if (!email) {
                  Toast.warn('E-Mail Boş Olamaz');
                } else if (!password) {
                  Toast.warn('Şifre Boş Olamaz');
                } else if (!repPassword) {
                  Toast.warn('Şifre Tekrarı Boş Olamaz');
                } else {
                  if (password != repPassword) {
                    Toast.warn('Şifreler Uyuşmuyor');
                  } else if (!isValidEmail(email)) {
                    Toast.warn('Geçerli Email Giriniz');
                  } else {
                    navigation.navigate('RegisterStep2', {
                      email: email,
                      password: password,
                      repPassword: repPassword,
                    });
                  }
                }
              }}>
              <Text
                style={{
                  shadowColor: '#000957',
                  shadowRadius: 20,
                  shadowOpacity: 0.9,
                  elevation: 7,
                }}
                className="font-semibold text-lg text-white">
                İlerle
              </Text>
              <Entypo name="chevron-right" className=" absolute right-4 " size={24} color="white" />
            </TouchableOpacity>
            <View className="absolute bottom-8 left-1/2 mb-6 -translate-x-1/2 flex-row items-center justify-center">
              <Text className="font-sans text-base text-gray-500">Zaten hesabın var mı? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Text className="font-semibold text-base text-primary"> Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={async () => {
              try {
                await Keychain.setGenericPassword('guest', 'true');
                console.log('Guest mode kaydedildi!');
                navigation.navigate('Keşfet');
              } catch (error) {
                console.log('Hata:', error);
              }
            }}
            className="  absolute bottom-2 left-1/2 -translate-x-1/2  items-center rounded-xl   p-2">
            <Text className="text-md font-semibold text-primary underline">
              Misafir Olarak Devam Et
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
