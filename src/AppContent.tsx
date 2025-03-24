import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../src/screens/SplashScreen';
import TabNavigator from '../src/navigation/TabNavigator';

import AuthNavigator from '../src/navigation/AuthNavigator';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../src/Redux/Store/store';
import ToastManager from 'toastify-react-native';
import { useEffect } from 'react';
import { checkGuestAuth, checkLoginAuth } from './Redux/Slices/authSlice';
const Stack = createNativeStackNavigator();
const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, isGuest } = useSelector((state: RootState) => state.authUser);

  useEffect(() => {
    const checkStorage = async () => {
      await dispatch(checkGuestAuth());
      await dispatch(checkLoginAuth());
    };
    checkStorage();
    console.log('kontrol yapıldı', isAuthenticated, isGuest);
  }, []);

  return (
    <NavigationContainer>
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
        {(isAuthenticated || isGuest) && <Stack.Screen name="Splash" component={SplashScreen} />}

        {loading == false && (isAuthenticated || isGuest) ? (
          <Stack.Screen name="Home" component={TabNavigator} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContent;
