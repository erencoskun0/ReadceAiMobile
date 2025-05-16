import { ActivityIndicator, View, BackHandler } from 'react-native';
import {
  NavigationContainer,
  useFocusEffect,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../src/screens/SplashScreen';
import TabNavigator from '../src/navigation/TabNavigator';
import AuthNavigator from '../src/navigation/AuthNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../src/Redux/Store/store';
import ToastManager from 'toastify-react-native';
import { useEffect, useRef, useCallback } from 'react';
import { checkGuestAuth, checkLoginAuth } from './Redux/Slices/authSlice';
import { ThemeProvider } from './context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';

// Navigation Ref oluşturalım
const navigationRef = createNavigationContainerRef();

// BackHandler yönetimi için yardımcı fonksiyon
const handleBackPress = () => {
  // Navigation başlatılmış mı kontrol et
  if (navigationRef.isReady()) {
    if (navigationRef.canGoBack()) {
      navigationRef.goBack();
      return true;
    } else {
      // Ana ekranda, çıkış onayı göster
      Alert.alert('Çıkış Yap', 'Uygulamadan çıkmak istediğinize emin misiniz?', [
        { text: 'İptal', style: 'cancel', onPress: () => {} },
        { text: 'Çıkış Yap', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  }
  return false;
};

const Stack = createNativeStackNavigator();
const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, isGuest } = useSelector((state: RootState) => state.authUser);

  // Uygulama başlatıldığında kontrol et
  useEffect(() => {
    const checkStorage = async () => {
      await dispatch(checkGuestAuth());
      await dispatch(checkLoginAuth());
    };
    checkStorage();
    console.log('kontrol yapıldı', isAuthenticated, isGuest);
  }, []);

  // Geri tuşu yönetimi - global olarak ayarla
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <StatusBar style="auto" translucent />
        <ThemeProvider>
          <NavigationContainer ref={navigationRef}>
            {loading && (
              <View
                className="absolute bottom-0 left-0 right-0 top-0 items-center justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Arka plana hafif bir opaklık ekler
                  zIndex: 10, // Diğer bileşenlerin üstünde olmasını sağlar
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}
            <ToastManager
              position="top" // Toast'ların ekranda nerede görüneceğini ayarlar (örneğin: top, bottom)
              duration={3000} // Toast'ın otomatik kapanma süresi (ms cinsinden)
              style={{
                backgroundColor: '#98D8EF', // Primary renk ile arka plan
                borderRadius: 8,
                marginHorizontal: 16,
              }}
              width={256}
              height={'auto'}
              textStyle={{
                color: '#000957',
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}
              showCloseIcon={false}
              showProgressBar={false}
              animationStyle={'upInUpOut'}
            />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
              {(isAuthenticated || isGuest) && (
                <Stack.Screen name="Splash" component={SplashScreen} />
              )}

              {loading == false && (isAuthenticated || isGuest) ? (
                <Stack.Screen name="Home" component={TabNavigator} />
              ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AppContent;
