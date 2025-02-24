import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreScreen from '../screens/ExploreScreen';
import CreateScreen from '../screens/CreateScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;

          // Örneğin route.name'e göre ikon belirleme:
          if (route.name === 'Explore') {
            IconComponent = <Ionicons name="compass-outline" size={size} color={color} />;
          } else if (route.name == 'Create') {
            IconComponent = <Ionicons name="add-circle-outline" size={size} color={color} />;
          } else if (route.name == 'Profile') {
            IconComponent = <Ionicons name="person-outline" size={size} color={color} />;
          }
          return IconComponent;
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#000957',
        tabBarInactiveTintColor: '#a1a1a1',
        tabBarStyle: {
          height: 55,
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
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
