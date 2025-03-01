import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Ionicons from '@expo/vector-icons/Ionicons';
const { height: DEVICE_HEIGHT } = Dimensions.get('window');
const CustomToUpModal = ({ children, isVisible, setIsVisible }: any) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onSwipeComplete={() => setIsVisible(false)}
      swipeDirection={['down']}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      style={{ margin: 0, justifyContent: 'flex-end' }}>
      <View
        className="rounded-t-3xl bg-white pt-4"
        style={{
          height: DEVICE_HEIGHT * 0.5,
          shadowColor: '#000957',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
        }}>
        <View className="mb-4 items-center">
          <View className="h-1.5 w-12 rounded-full bg-gray-300" />
        </View>
        {children}

        <TouchableOpacity
          className="absolute right-4 top-4 p-2"
          onPress={() => setIsVisible(false)}>
          <Ionicons name="close" size={24} color="#98D8EF" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CustomToUpModal;
