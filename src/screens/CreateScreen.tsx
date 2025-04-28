import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../components/CustomHeader';
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  MaterialIcons,
  AntDesign,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../context/ThemeContext';

// Metin konuları
const topics = [
  { id: 'technology', name: 'Teknoloji', icon: 'devices', color: '#3B82F6' },
  { id: 'health', name: 'Sağlık', icon: 'fitness-center', color: '#10B981' },
  { id: 'science', name: 'Bilim', icon: 'science', color: '#6366F1' },
  { id: 'travel', name: 'Seyahat', icon: 'flight', color: '#F59E0B' },
  { id: 'culture', name: 'Kültür', icon: 'theater-comedy', color: '#EC4899' },
  { id: 'education', name: 'Eğitim', icon: 'school', color: '#8B5CF6' },
];

// Metin türleri
const textTypes = [
  { id: 'story', name: 'Hikaye', icon: 'menu-book' },
  { id: 'article', name: 'Makale', icon: 'article' },
  { id: 'autobiography', name: 'Otobiyografi', icon: 'face' },
  { id: 'biography', name: 'Biyografi', icon: 'person' },
  { id: 'philosophy', name: 'Felsefi Yazı', icon: 'psychology' },
  { id: 'novel', name: 'Roman', icon: 'auto-stories' },
  { id: 'essay', name: 'Deneme', icon: 'edit-note' },
  { id: 'poetry', name: 'Şiir', icon: 'format-quote' },
  { id: 'research', name: 'Araştırma', icon: 'search' },
];

// Dil seviyeleri
const languageLevels = [
  { id: 'a1', name: 'A1', description: 'Başlangıç' },
  { id: 'a2', name: 'A2', description: 'Temel' },
  { id: 'b1', name: 'B1', description: 'Orta' },
  { id: 'b2', name: 'B2', description: 'Orta-Üstü' },
  { id: 'c1', name: 'C1', description: 'İleri' },
];

// Örnek Metin (mock data)
const sampleArticle = {
  id: 'art12345',
  title: 'Teknolojinin Günlük Hayatımıza Etkileri',
  topic: 'technology',
  level: 'b1',
  imageUrl:
    'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1287&auto=format&fit=crop',
  readTime: '5 dk',
  wordCount: 750,
  excerpt:
    'Modern dünyada teknoloji hayatımızın her alanında büyük bir rol oynamaktadır. Sabah alarm sesimizden akşam izlediğimiz dizilere kadar, teknoloji günlük rutinlerimizin vazgeçilmez bir parçası haline gelmiştir. Bu makale, teknolojinin günlük yaşamımıza nasıl entegre olduğunu ve bizi nasıl etkilediğini incelemektedir...',
};

// Platform spesifik stiller
const platformStyles = {
  shadow: Platform.select({
    ios: {
      shadowColor: '#000957',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    android: {
      elevation: 2,
    },
  }),
  cardShadow: Platform.select({
    ios: {
      shadowColor: '#000957',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    android: {
      elevation: 2,
    },
  }),
  modalShadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    android: {
      elevation: 10,
    },
  }),
};

// Tip tanımları
interface Topic {
  id: string;
  name: string;
  icon: any; // MaterialIcons'ın kabul ettiği icon tipleri için any kullanıyoruz
  color: string;
}

interface TextType {
  id: string;
  name: string;
  icon: any;
}

interface LanguageLevel {
  id: string;
  name: string;
  description: string;
}

interface Article {
  id: string;
  title: string;
  topic: string;
  level: string;
  imageUrl: string;
  readTime: string;
  wordCount: number;
  excerpt: string;
}

const CreateScreen = () => {
  const navigation = useNavigation<any>();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedTextType, setSelectedTextType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);

  // Metin oluşturma işlemi
  const generateArticle = () => {
    if (!selectedTopic || !selectedLevel || !title || !selectedTextType) {
      return; // Form validasyonu
    }

    setIsGenerating(true);

    // Burada API isteği yapılacak
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedArticle({
        ...sampleArticle,
        title: title,
        topic: selectedTopic,
        level: selectedLevel,
      });
      setModalVisible(true);
    }, 3000);
  };

  const navigateToArticle = () => {
    setModalVisible(false);
    // Burada gerçek yönlendirme yapılacak
    // navigation.navigate('ArticleDetail', { articleId: generatedArticle?.id });
  };

  const TopicItem = ({ item }: { item: Topic }) => (
    <TouchableOpacity
      onPress={() => setSelectedTopic(item.id)}
      className={`mr-3 rounded-xl p-4 ${selectedTopic === item.id ? 'bg-primary' : 'bg-white'}`}
      style={{
        width: 110,
        borderWidth: 1,
        borderColor: selectedTopic === item.id ? '#000957' : '#00095710',
        ...platformStyles.shadow,
      }}>
      <View className="items-center">
        <View
          className="mb-2 h-12 w-12 items-center justify-center rounded-full"
          style={{
            backgroundColor: selectedTopic === item.id ? 'white' : `${item.color}15`,
          }}>
          <MaterialIcons
            name={item.icon}
            size={24}
            color={selectedTopic === item.id ? item.color : item.color}
          />
        </View>
        <Text
          className={`text-center font-medium text-base ${selectedTopic === item.id ? 'text-white' : 'text-[#000957]'}`}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const TextTypeItem = ({ item }: { item: TextType }) => (
    <TouchableOpacity
      onPress={() => setSelectedTextType(item.id)}
      className={`mb-3 mr-3 rounded-xl p-3 ${selectedTextType === item.id ? 'bg-primary' : 'bg-white'}`}
      style={{
        width: '30%',
        borderWidth: 1,
        borderColor: selectedTextType === item.id ? '#000957' : '#00095710',
        ...platformStyles.shadow,
      }}>
      <View className="items-center">
        <View
          className="mb-2 h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: selectedTextType === item.id ? 'white' : '#E6F0FF',
          }}>
          <MaterialIcons
            name={item.icon}
            size={22}
            color={selectedTextType === item.id ? '#000957' : '#3B82F6'}
          />
        </View>
        <Text
          className={`text-nowrap text-center font-medium text-sm ${selectedTextType === item.id ? 'text-white' : 'text-[#000957]'}`}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const LevelItem = ({ item }: { item: LanguageLevel }) => (
    <TouchableOpacity
      onPress={() => setSelectedLevel(item.id)}
      className={`mr-3 rounded-xl px-4 py-3 ${selectedLevel === item.id ? 'bg-primary' : 'bg-white'}`}
      style={{
        borderWidth: 1,
        borderColor: selectedLevel === item.id ? '#000957' : '#00095710',
        ...platformStyles.shadow,
      }}>
      <View className="flex-row items-center">
        <Text
          className={`font-bold text-lg ${selectedLevel === item.id ? 'text-white' : 'text-primary'}`}>
          {item.name}
        </Text>
        <Text
          className={`ml-2 text-sm ${selectedLevel === item.id ? 'text-white' : 'text-gray-500'}`}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Metin Başarıyla Oluşturuldu Modalı
  const ArticleCreatedModal = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <View className="flex-1 items-center justify-center bg-black/60">
        <View
          className="w-11/12 max-w-md overflow-hidden rounded-3xl bg-white"
          style={{
            ...platformStyles.modalShadow,
          }}>
          {/* Başlık */}
          <LinearGradient
            colors={['#000957', '#3B82F6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-6 py-5">
            <View className="flex-row items-center justify-between py-2 pl-4 pr-2">
              <Text className="font-bold text-2xl text-white">Metin Oluşturuldu!</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="rounded-full bg-white/20 p-2">
                <Ionicons name="close" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Metin Görseli */}
          <View className="h-52 w-full">
            <Image
              source={{ uri: generatedArticle?.imageUrl }}
              className="h-full w-full"
              resizeMode="cover"
            />
            <View className="bg-primary px-2 py-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="mr-3 rounded-full bg-white/25 px-3 py-1.5">
                    <Text className="font-bold text-sm text-white">
                      {selectedLevel?.toUpperCase()} Seviye
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={16} color="white" className="mr-1" />
                    <Text className="mr-3 font-medium text-sm text-white">
                      {generatedArticle?.readTime}
                    </Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <Text className="font-medium text-sm text-white">
                    {generatedArticle?.wordCount} kelime
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Metin Bilgileri */}
          <View className="mt-10 p-6">
            <Text className="mb-3 font-bold text-2xl text-primary">{generatedArticle?.title}</Text>

            <View className="mb-5">
              <Text className="text-base leading-6 text-gray-800" numberOfLines={4}>
                {generatedArticle?.excerpt}
              </Text>
            </View>

            <View className="mb-6 flex-row flex-wrap">
              <View className="mb-2 mr-2 rounded-full bg-blue-50 px-4 py-2">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={18} color="#3B82F6" />
                  <Text className="ml-1 font-medium text-sm text-blue-600">
                    Kelime öğrenmeye uygun
                  </Text>
                </View>
              </View>

              <View className="mb-2 rounded-full bg-green-50 px-4 py-2">
                <View className="flex-row items-center">
                  <MaterialIcons
                    name={(topics.find((t) => t.id === selectedTopic)?.icon || 'category') as any}
                    size={18}
                    color="#10B981"
                  />
                  <Text className="ml-1 font-medium text-sm text-green-600">
                    {topics.find((t) => t.id === selectedTopic)?.name || ''}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={navigateToArticle}
              className="flex-row items-center justify-center rounded-xl bg-primary py-4">
              <Text className="mr-2 font-bold text-lg text-white">Makaleyi Okumaya Başla</Text>
              <Feather name="arrow-right" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={globalStyles.container}>
      <CustomHeader title="İçerik Oluştur" pt={'pt-[0]'} titleSize={'text-2xl'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 py-4">
            {/* Başlık */}
            <View className="mb-6">
              <LinearGradient
                colors={['#000957', '#3B82F6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  left: 0,
                  height: '100%',
                  width: 6,
                  borderRadius: 100,
                }}
              />
              <View className="ml-4">
                <Text className="mb-1 font-bold text-xl text-primary">
                  Yapay Zeka Metin Oluşturucu
                </Text>
                <Text className="text-base text-gray-600">
                  Yapay zeka ile dil seviyenize uygun özelleştirilmiş Metin içerikleri oluşturun
                </Text>
              </View>
            </View>

            {/* Metin Türü */}
            <View className="mb-8">
              <Text className="mb-2 font-bold text-lg text-primary">Metin Türü</Text>
              <Text className="mb-4 text-base text-gray-600">
                Oluşturmak istediğiniz metnin türünü seçin. Bu, içeriğin formatını ve yapısını
                belirleyecek.
              </Text>

              <View className="flex-row flex-wrap justify-between">
                {textTypes.map((type) => (
                  <TextTypeItem key={type.id} item={type} />
                ))}
              </View>
            </View>

            {/* Metin Konusu */}
            <View className="mb-8">
              <Text className="mb-2 font-bold text-lg text-primary">Metin Konusu</Text>
              <Text className="mb-4 text-base text-gray-600">
                Makaleniz için ilginizi çeken bir konu seçin. Seçtiğiniz konu, içeriğin odak
                noktasını belirleyecek.
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-1">
                {topics.map((topic) => (
                  <TopicItem key={topic.id} item={topic} />
                ))}
              </ScrollView>
            </View>

            {/* Dil Seviyesi */}
            <View className="mb-8">
              <Text className="mb-2 font-bold text-lg text-primary">Dil Seviyesi</Text>
              <Text className="mb-4 text-base text-gray-600">
                Metin hangi dil seviyesinde olmalı? Seviyenize uygun kelimeler ve gramer yapıları
                kullanılacaktır.
              </Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-1">
                {languageLevels.map((level) => (
                  <LevelItem key={level.id} item={level} />
                ))}
              </ScrollView>
            </View>

            {/* Başlık Girişi */}
            <View className="mb-8">
              <Text className="mb-2 font-bold text-lg text-primary">Metin Başlığı</Text>
              <Text className="mb-3 text-base text-gray-600">
                Makaleniz için bir başlık girin veya yapay zekadan öneri almak için sağdaki simgeye
                dokunun.
              </Text>
              <View className="relative">
                <TextInput
                  className="rounded-xl border border-[#00095720] bg-white p-4 text-base"
                  placeholder="Metin başlığını girin veya öneri alın"
                  value={title}
                  multiline
                  numberOfLines={4}
                  onChangeText={setTitle}
                  textAlignVertical="top"
                  style={{ height: 120 }}
                />
                {/*   <TouchableOpacity
                  className="absolute right-4 top-4"
                  style={Platform.OS === 'ios' ? { top: 15 } : {}}>
                  <Ionicons name="sparkles-outline" size={24} color="#98D8EF" />
                </TouchableOpacity> */}
              </View>
            </View>

            {/* Anahtar Kelimeler */}
            <View className="mb-8">
              <Text className="mb-2 font-bold text-lg text-primary">Anahtar Kelimeler</Text>
              <Text className="mb-3 text-base text-gray-600">
                Makalede özellikle öğrenmek istediğiniz kelimeleri virgülle ayırarak ekleyin.
                (İsteğe bağlı)
              </Text>
              <TextInput
                className="rounded-xl border border-[#00095720] bg-white p-4 text-base"
                placeholder="Örn: sürdürülebilirlik, iklim değişikliği, yenilenebilir enerji"
                value={keywords}
                multiline
                numberOfLines={4}
                onChangeText={setKeywords}
                textAlignVertical="top"
                style={{ height: 120 }}
              />
            </View>

            {/* Ek Bilgiler */}
            <View className="mb-8">
              <Text className="mb-2 font-bold text-lg text-primary">Ek İstekler</Text>
              <Text className="mb-3 text-base text-gray-600">
                Makalenizle ilgili özel talepleriniz veya içermesini istediğiniz konular varsa
                belirtin. (İsteğe bağlı)
              </Text>
              <TextInput
                className="rounded-xl border border-[#00095720] bg-white p-4 text-base"
                placeholder="Örn: Günlük konuşma dilinde kullanılan ifadelere ağırlık verilsin."
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={{ height: 120 }}
              />
            </View>

            {/* Oluştur Butonu */}
            <TouchableOpacity
              onPress={generateArticle}
              disabled={
                !selectedTopic || !selectedLevel || !title || !selectedTextType || isGenerating
              }
              className={`mb-8 items-center rounded-xl py-4 ${
                !selectedTopic || !selectedLevel || !title || !selectedTextType || isGenerating
                  ? 'bg-gray-300'
                  : 'bg-primary'
              }`}>
              {isGenerating ? (
                <View className="flex-row items-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="ml-2 font-bold text-lg text-white">Metin Oluşturuluyor...</Text>
                </View>
              ) : (
                <View className="flex-row items-center">
                  <MaterialCommunityIcons name="fountain-pen-tip" size={22} color="white" />
                  <Text className="ml-2 font-bold text-lg text-white">Metin Oluştur</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* İpuçları */}
            <View className="mb-6 rounded-xl bg-blue-50 p-5">
              <View className="mb-3 flex-row items-center">
                <Ionicons name="bulb-outline" size={24} color="#3B82F6" />
                <Text className="ml-2 font-bold text-lg text-primary">İpuçları</Text>
              </View>
              <Text className="mb-2 text-base leading-5 text-gray-700">
                • Seçtiğiniz metin türü ve dil seviyesine uygun içerik oluşturulur.
              </Text>
              <Text className="mb-2 text-base leading-5 text-gray-700">
                • Detaylı ve açıklayıcı bir başlık, daha iyi içerik üretilmesini sağlar.
              </Text>
              <Text className="mb-2 text-base leading-5 text-gray-700">
                • Belirli kelimeleri öğrenmek istiyorsanız anahtar kelimeler bölümüne ekleyin.
              </Text>
              <Text className="text-base leading-5 text-gray-700">
                • Ek istekler bölümünde makalenin tarzı ve içeriği hakkında detay verebilirsiniz.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Metin Oluşturuldu Modalı */}
      <ArticleCreatedModal />
    </View>
  );
};

export default CreateScreen;
