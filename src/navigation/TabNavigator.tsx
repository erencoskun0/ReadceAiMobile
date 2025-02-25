import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from '../screens/SearchScreen';
import DictionaryScreen from '../screens/DictionaryScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;

          // Örneğin route.name'e göre ikon belirleme:
          if (route.name === 'Keşfet') {
            IconComponent = <Ionicons name="compass-outline" size={size} color={color} />;
          } else if (route.name == 'Oluştur') {
            IconComponent = <Ionicons name="add-circle-outline" size={size} color={color} />;
          } else if (route.name == 'Profilim') {
            IconComponent = <Ionicons name="person-outline" size={size} color={color} />;
          } else if (route.name == 'Ara') {
            IconComponent = <Ionicons name="search" size={size} color={color} />;
          } else if (route.name == 'Sözlüğüm') {
            IconComponent = <Ionicons name="language-outline" size={size} color={color} />;
          }
          return IconComponent;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000957',
        tabBarInactiveTintColor: '#a1a1a1',
        tabBarStyle: {
          height: 70,

          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarItemStyle: {
          paddingVertical: 0,
        },
      })}>
      <Tab.Screen name="Keşfet" component={ExploreScreen} />
      <Tab.Screen name="Ara" component={SearchScreen} />
      <Tab.Screen name="Oluştur" component={CreateScreen} />
      <Tab.Screen name="Sözlüğüm" component={DictionaryScreen} />
      <Tab.Screen name="Profilim" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
