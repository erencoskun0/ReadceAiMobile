import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import DictionaryScreen from '../screens/DictionaryScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ArticleAllLangLevelScreen from '../screens/ArticleAllLangLevelScreen';
import ArticleAllLangScreen from '../screens/ArticleAllLangScreen';
import ArticleAllTypeScreen from '../screens/ArticleAllTypeScreen';
import ArticleAllCategoryScreen from '../screens/ArticleAllCategoryScreen';
import AllWordsScreen from '../screens/AllWordsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const WINDOW_WIDTH = Dimensions.get('window').width;

// Tür tanımlamaları
type IconName = keyof typeof Ionicons.glyphMap;

// Sekme özelliklerini tanımlama
interface TabInfo {
  name: string;
  iconName: IconName;
  component: React.ComponentType<any>;
}

// Navigasyon çubuğu yüksekliği
const TAB_BAR_HEIGHT = 80;

// Ekranların alt kısmında padding ekleyen sarmalayıcı
const ScreenContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <View style={{ flex: 1, paddingBottom: TAB_BAR_HEIGHT }}>{children}</View>;
};

// Ekran bileşenlerini sarmalama fonksiyonu
const withBottomInset = (Component: React.ComponentType<any>) => {
  return (props: any) => (
    <ScreenContainer>
      <Component {...props} />
    </ScreenContainer>
  );
};

const TABS: TabInfo[] = [
  {
    name: 'Keşfet',
    iconName: 'compass-outline',
    component: ExploreStack,
  },
  {
    name: 'Ara',
    iconName: 'search-outline',
    component: withBottomInset(SearchScreen),
  },
  {
    name: 'Oluştur',
    iconName: 'add-circle-outline',
    component: withBottomInset(CreateScreen),
  },
  {
    name: 'Sözlüğüm',
    iconName: 'book-outline',
    component: DictionaryStack,
  },
  {
    name: 'Profilim',
    iconName: 'person-outline',
    component: withBottomInset(ProfileScreen),
  },
];

// Keşfet için Stack Navigator
function ExploreStack() {
  return (
    <ScreenContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="KeşfetMain" component={ExploreScreen} />
        <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
        <Stack.Screen name="ArticleAllLangLevelScreen" component={ArticleAllLangLevelScreen} />
        <Stack.Screen name="ArticleAllLangScreen" component={ArticleAllLangScreen} />
        <Stack.Screen name="ArticleAllTypeScreen" component={ArticleAllTypeScreen} />
        <Stack.Screen name="ArticleAllCategoryScreen" component={ArticleAllCategoryScreen} />
      </Stack.Navigator>
    </ScreenContainer>
  );
}

// Dictionary için Stack Navigator
function DictionaryStack() {
  return (
    <ScreenContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SözlükMain" component={DictionaryScreen} />
        <Stack.Screen name="AllWordsScreen" component={AllWordsScreen} />
      </Stack.Navigator>
    </ScreenContainer>
  );
}

// Tab Bar için özel buton
interface TabBarItemProps {
  label: string;
  iconName: IconName;
  isFocused: boolean;
  onPress: () => void;
  index: number;
}

const TabBarItem: React.FC<TabBarItemProps> = ({ label, iconName, isFocused, onPress, index }) => {
  // Aktif ikonu belirlemek için outline'ı kaldırma
  const getActiveIconName = (name: IconName): IconName => {
    if (name.includes('-outline')) {
      // TypeScript cast işlemi gerekli, çünkü string manipülasyonu için
      return name.replace('-outline', '') as IconName;
    }
    return name;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[
        styles.tabItem,
        index === 0 && { marginLeft: 6 },
        index === TABS.length - 1 && { marginRight: 6 },
      ]}>
      {/* Arkaplan göstergesi */}
      {isFocused && <View style={styles.tabItemActiveBackground} />}

      {/* İkon */}
      <View style={styles.iconContainer}>
        <Ionicons
          name={isFocused ? getActiveIconName(iconName) : iconName}
          size={iconName === 'add-circle-outline' ? 26 : 22}
          color={isFocused ? '#000957' : '#9E9E9E'}
          style={isFocused ? styles.iconActive : styles.iconInactive}
        />
      </View>

      {/* Etiket */}
      <Text style={[styles.tabLabel, isFocused ? styles.tabLabelActive : styles.tabLabelInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// Özel Tab Bar
interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        {TABS.map((tab, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(state.routes[index].name);
            }
          };

          return (
            <TabBarItem
              key={index}
              label={tab.name}
              iconName={tab.iconName}
              isFocused={isFocused}
              onPress={onPress}
              index={index}
            />
          );
        })}
      </View>
    </View>
  );
};

// Ana Tab Navigator Komponenti
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      {TABS.map((tab, index) => (
        <Tab.Screen key={index} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: TAB_BAR_HEIGHT,
    paddingBottom: 4,
    backgroundColor: '#F8FAFF', // Ya da rgba(0, 0, 0, 0) gibi bir değer
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    height: 65,
    paddingVertical: 8,
    shadowColor: '#000957',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    width: WINDOW_WIDTH * 0.92,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    position: 'relative',
  },
  tabItemActiveBackground: {
    position: 'absolute',
    top: -2,
    left: 1,
    right: 1,
    bottom: -2,
    backgroundColor: '#EBF6FA',
    borderRadius: 20,
    width: '100%',
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  iconActive: {
    transform: [{ scale: 1.15 }],
  },
  iconInactive: {
    opacity: 0.85,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 0,
    letterSpacing: 0.2,
    zIndex: 1,
  },
  tabLabelActive: {
    fontWeight: '600',
    color: '#000957',
  },
  tabLabelInactive: {
    fontWeight: '400',
    color: '#9E9E9E',
  },
});

export default TabNavigator;
