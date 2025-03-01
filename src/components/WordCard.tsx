import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POPUP_WIDTH = 250;
const SCREEN_PADDING = 20;

interface WordCardProps {
  text: string;
  translation: string;
  description: string;
  isActive: boolean;
  onPress: () => void;
  onClose: () => void;
}

const WordCard = ({
  text,
  translation,
  description,
  isActive,
  onPress,
  onClose,
}: WordCardProps) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    arrowX: POPUP_WIDTH / 2 - 8, // Okun varsayılan konumu
  });
  const textRef = useRef<View>(null);

  const measurePosition = () => {
    textRef.current?.measureInWindow((x, y, width, height) => {
      const wordCenterX = x + width / 2;
      let adjustedX = wordCenterX - POPUP_WIDTH / 2;
      let arrowX = POPUP_WIDTH / 2 - 8; // Okun varsayılan ortada olması

      // Sağ kenara çok yakınsa popup'ı sola kaydır
      if (adjustedX + POPUP_WIDTH > SCREEN_WIDTH - SCREEN_PADDING) {
        adjustedX = SCREEN_WIDTH - POPUP_WIDTH - SCREEN_PADDING;
        arrowX = wordCenterX - adjustedX - 8; // Okun yerini ayarla
      }
      // Sol kenara çok yakınsa popup'ı sağa kaydır
      else if (adjustedX < SCREEN_PADDING) {
        adjustedX = SCREEN_PADDING;
        arrowX = wordCenterX - adjustedX - 8; // Okun yerini ayarla
      }

      setPosition({
        x: adjustedX,
        y: y + height + 8,
        arrowX,
      });

      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 5,
      }).start();
    });
  };

  useEffect(() => {
    if (isActive) measurePosition();
  }, [isActive]);

  return (
    <View ref={textRef} collapsable={false}>
      <TouchableOpacity onPress={onPress}>
        <Text className="font-PoppinsMedium relative text-primary">
          {text}
          {isActive && <View className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary" />}
        </Text>
      </TouchableOpacity>

      {isActive && (
        <Animated.View
          style={[
            styles.popup,
            {
              top: position.y,
              left: position.x,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <View style={[styles.arrow, { left: position.arrowX }]} />

          <View className="p-4">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons name="book" size={16} color="#000957" />
              <Text className="font-PoppinsSemiBold text-lg text-primary">{translation}</Text>
            </View>

            <Text className="font-PoppinsRegular text-sm leading-5 text-gray-600">
              {description}
            </Text>

            <TouchableOpacity
              className="mt-4 items-center rounded-lg bg-secondary py-2"
              onPress={onClose}>
              <Text className="font-PoppinsMedium text-primary">Öğrendim</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 12,
    width: POPUP_WIDTH,
    maxWidth: SCREEN_WIDTH - SCREEN_PADDING * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  arrow: {
    position: 'absolute',
    top: -6,
    width: 16,
    height: 16,
    backgroundColor: 'white',
    transform: [{ rotate: '45deg' }],
  },
});

export default WordCard;
