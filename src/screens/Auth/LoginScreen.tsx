import React, { useState } from 'react';
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

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      className="flex-1 bg-white">
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          className="px-6">
          <View className=" mt-auto  items-center">
            <View className="mb-6 items-center">
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
              <View className="mb-8 flex-row items-center border-b border-primary pb-2">
                <Ionicons name="mail-outline" size={24} color="#000957" />
                <TextInput
                  placeholder="E-posta"
                  placeholderTextColor="#000957"
                  className="ml-3 flex-1 py-1 font-sans text-lg text-primary"
                  keyboardType="email-address"
                />
              </View>
              <View className="mb-6 flex-row items-center border-b border-primary pb-2">
                <Ionicons name="lock-closed-outline" size={24} color="#000957" />
                <TextInput
                  placeholder="Şifre"
                  placeholderTextColor="#000957"
                  className="ml-3 flex-1 py-1 font-sans text-lg text-primary"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={24}
                    color="#000957"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="mb-4 items-center rounded-full bg-primary p-4"
                onPress={() => navigation.navigate('Home')}>
                <Text className="font-semibold text-lg text-white">Giriş Yap</Text>
              </TouchableOpacity>
            </View>

            {/* Kayıt Ol Bölümü */}
            <View className="mb-6 flex-row items-center justify-center">
              <Text className="font-sans text-base text-gray-500">Hesabın yok mu? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className="font-semibold text-base text-primary"> Kayıt Ol</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            className="mt-auto   items-center rounded-xl   p-2"
            onPress={() => navigation.navigate('Home')}>
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
