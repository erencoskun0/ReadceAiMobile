import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
];
const ExploreForYou = () => {
  return (
    <View>
      <View className="mb-1 mt-5 flex flex-row items-center justify-between px-3">
        <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Sana Özel Önerilerimiz</Text>
        <TouchableOpacity>
          <Text>Tümünü göster</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row items-center">
        <FlatList
          data={data}
          horizontal
          renderItem={({ item }) => (
            <View className="mx-2 w-96 rounded-lg bg-secondary p-4">
              <Text className="text-white">{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default ExploreForYou;
