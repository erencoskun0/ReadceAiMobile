import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Ionicons,
  MaterialIcons,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';

// API servislerini import edilecek
// import { GetAllArticlesIsPublic, GetAllArticlesByTypeId, GetAllArticlesByCategoryId } from '../services/apiExplore';

// Örnek veri - Gerçek API implementasyonunda kaldırılacak
const sampleArticles = [
  {
    id: 'art1',
    articleTitle: 'Modern Şehirlerde Yaşam',
    articleSummary: 'Günümüz şehirlerinde yaşamanın avantajları ve zorlukları üzerine...',
    articleImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070',
    langLevel: { id: 'b1', langLevelName: 'B1' },
    articleType: { id: 'article', articleTypeName: 'Makale' },
    categories: { id: 'culture', name: 'Kültür' },
    readTime: '4 dk',
    wordCount: 650,
  },
  {
    id: 'art2',
    articleTitle: 'Teknolojinin Eğitimdeki Rolü',
    articleSummary: 'Eğitim sisteminde teknoloji kullanımının öğrenme üzerindeki etkileri...',
    articleImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1974',
    langLevel: { id: 'a2', langLevelName: 'A2' },
    articleType: { id: 'research', articleTypeName: 'Araştırma' },
    categories: { id: 'technology', name: 'Teknoloji' },
    readTime: '6 dk',
    wordCount: 820,
  },
  {
    id: 'art3',
    articleTitle: 'Doğa ve İnsan İlişkisi',
    articleSummary: 'İnsanın doğayla kurduğu bağın tarihsel ve felsefi boyutları...',
    articleImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071',
    langLevel: { id: 'c1', langLevelName: 'C1' },
    articleType: { id: 'philosophy', articleTypeName: 'Felsefi Yazı' },
    categories: { id: 'nature', name: 'Doğa' },
    readTime: '8 dk',
    wordCount: 1100,
  },
  {
    id: 'art4',
    articleTitle: 'Kahve Kültürü',
    articleSummary: 'Dünya genelinde kahve kültürü ve tüketim alışkanlıkları hakkında...',
    articleImage: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1974',
    langLevel: { id: 'a1', langLevelName: 'A1' },
    articleType: { id: 'story', articleTypeName: 'Hikaye' },
    categories: { id: 'culture', name: 'Kültür' },
    readTime: '3 dk',
    wordCount: 450,
  },
  {
    id: 'art5',
    articleTitle: 'Spor ve Sağlıklı Yaşam',
    articleSummary: 'Düzenli spor yapmanın sağlık üzerindeki olumlu etkileri...',
    articleImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070',
    langLevel: { id: 'b2', langLevelName: 'B2' },
    articleType: { id: 'article', articleTypeName: 'Makale' },
    categories: { id: 'health', name: 'Sağlık' },
    readTime: '5 dk',
    wordCount: 750,
  },
];

// Metin türleri
const textTypes = [
  { id: 'all', name: 'Tümü', icon: 'format-list-bulleted' },
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

// Kategoriler
const categories = [
  { id: 'all', name: 'Tümü', icon: 'category', color: '#3B82F6' },
  { id: 'technology', name: 'Teknoloji', icon: 'devices', color: '#3B82F6' },
  { id: 'health', name: 'Sağlık', icon: 'fitness-center', color: '#10B981' },
  { id: 'science', name: 'Bilim', icon: 'science', color: '#6366F1' },
  { id: 'travel', name: 'Seyahat', icon: 'flight', color: '#F59E0B' },
  { id: 'culture', name: 'Kültür', icon: 'theater-comedy', color: '#EC4899' },
  { id: 'education', name: 'Eğitim', icon: 'school', color: '#8B5CF6' },
  { id: 'nature', name: 'Doğa', icon: 'nature', color: '#10B981' },
  { id: 'sports', name: 'Spor', icon: 'sports-soccer', color: '#F59E0B' },
];

// Dil seviyeleri
const languageLevels = [
  { id: 'all', name: 'Tümü', description: '' },
  { id: 'a1', name: 'A1', description: 'Başlangıç' },
  { id: 'a2', name: 'A2', description: 'Temel' },
  { id: 'b1', name: 'B1', description: 'Orta' },
  { id: 'b2', name: 'B2', description: 'Orta-Üstü' },
  { id: 'c1', name: 'C1', description: 'İleri' },
];

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
      elevation: 3,
    },
  }),
};

interface ArticleItem {
  id: string;
  articleTitle: string;
  articleSummary: string;
  articleImage: string;
  langLevel: { id: string; langLevelName: string };
  articleType: { id: string; articleTypeName: string };
  categories: { id: string; name: string };
  readTime: string;
  wordCount: number;
}

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [articles, setArticles] = useState<ArticleItem[]>(sampleArticles);
  const [showFilters, setShowFilters] = useState(false);

  // API'den arama sonuçlarını al
  const fetchArticles = () => {
    setIsLoading(true);
    // Burada gerçek API isteği yapılacak
    // Örnek: API isteği
    setTimeout(() => {
      // Filtreleme işlemleri
      let filteredArticles = [...sampleArticles];

      if (searchQuery.trim() !== '') {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.articleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.articleSummary.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (selectedCategory !== 'all') {
        filteredArticles = filteredArticles.filter(
          (article) => article.categories.id === selectedCategory
        );
      }

      if (selectedType !== 'all') {
        filteredArticles = filteredArticles.filter(
          (article) => article.articleType.id === selectedType
        );
      }

      if (selectedLevel !== 'all') {
        filteredArticles = filteredArticles.filter(
          (article) => article.langLevel.id === selectedLevel
        );
      }

      setArticles(filteredArticles);
      setIsLoading(false);
    }, 1000);
  };

  // Arama yapma
  const handleSearch = () => {
    fetchArticles();
  };

  // Filter temizleme
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedLevel('all');
    setShowFilters(false);
    fetchArticles();
  };

  // Makaleye gitme
  const navigateToArticle = (articleId: string) => {
    // Detay sayfasına yönlendirme
    // navigation.navigate('ArticleDetail', { articleId });
  };

  useEffect(() => {
    // Sayfa açıldığında makaleleri getir
    fetchArticles();
  }, []);

  // Kategori Komponenti
  const CategoryItem = ({
    item,
  }: {
    item: { id: string; name: string; icon: string; color: string };
  }) => (
    <TouchableOpacity
      onPress={() => setSelectedCategory(item.id)}
      className={`mr-3 rounded-xl p-3 ${selectedCategory === item.id ? 'bg-primary' : 'bg-white'}`}
      style={{
        borderWidth: 1,
        borderColor: selectedCategory === item.id ? '#000957' : '#00095710',
        ...platformStyles.shadow,
      }}>
      <View className="flex-row items-center">
        <View
          className="mr-2 h-8 w-8 items-center justify-center rounded-full"
          style={{
            backgroundColor: selectedCategory === item.id ? 'white' : `${item.color}15`,
          }}>
          <MaterialIcons
            name={item.icon as any}
            size={18}
            color={selectedCategory === item.id ? item.color : item.color}
          />
        </View>
        <Text
          className={`font-medium text-sm ${selectedCategory === item.id ? 'text-white' : 'text-[#000957]'}`}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Tür Komponenti
  const TypeItem = ({ item }: { item: { id: string; name: string; icon: string } }) => (
    <TouchableOpacity
      onPress={() => setSelectedType(item.id)}
      className={`mr-3 rounded-xl p-3 ${selectedType === item.id ? 'bg-primary' : 'bg-white'}`}
      style={{
        borderWidth: 1,
        borderColor: selectedType === item.id ? '#000957' : '#00095710',
        ...platformStyles.shadow,
      }}>
      <View className="flex-row items-center">
        <View
          className="mr-2 h-8 w-8 items-center justify-center rounded-full"
          style={{
            backgroundColor: selectedType === item.id ? 'white' : '#E6F0FF',
          }}>
          <MaterialIcons
            name={item.icon as any}
            size={18}
            color={selectedType === item.id ? '#000957' : '#3B82F6'}
          />
        </View>
        <Text
          className={`font-medium text-sm ${selectedType === item.id ? 'text-white' : 'text-[#000957]'}`}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // Seviye Komponenti
  const LevelItem = ({ item }: { item: { id: string; name: string; description: string } }) => (
    <TouchableOpacity
      onPress={() => setSelectedLevel(item.id)}
      className={`mr-3 rounded-xl px-4 py-2 ${selectedLevel === item.id ? 'bg-primary' : 'bg-white'}`}
      style={{
        borderWidth: 1,
        borderColor: selectedLevel === item.id ? '#000957' : '#00095710',
        ...platformStyles.shadow,
      }}>
      <View className="flex-row items-center">
        <Text
          className={`font-bold text-base ${selectedLevel === item.id ? 'text-white' : 'text-primary'}`}>
          {item.name}
        </Text>
        {item.description && (
          <Text
            className={`ml-2 text-xs ${selectedLevel === item.id ? 'text-white' : 'text-gray-500'}`}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // Makale Komponenti
  const ArticleCard = ({ item }: { item: ArticleItem }) => (
    <TouchableOpacity
      onPress={() => navigateToArticle(item.id)}
      className="mb-5 overflow-hidden rounded-xl bg-white"
      style={platformStyles.cardShadow}>
      {/* Görsel Kısmı */}
      <View className="relative">
        <Image source={{ uri: item.articleImage }} className="h-44 w-full" resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="absolute bottom-0 left-0 right-0 p-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="rounded-full bg-white/25 px-3 py-1.5">
                <Text className="font-bold text-xs text-white">{item.langLevel.langLevelName}</Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={14} color="white" />
              <Text className="ml-1 font-medium text-xs text-white">{item.readTime}</Text>
              <Text className="ml-2 font-medium text-xs text-white">{item.wordCount} kelime</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* İçerik Kısmı */}
      <View className="p-4">
        {/* Etiketler */}
        <View className="mb-3 flex-row flex-wrap">
          <View className="mr-2 rounded-full bg-blue-50 px-3 py-1.5">
            <Text className="font-medium text-xs text-blue-600">
              {item.articleType.articleTypeName}
            </Text>
          </View>
          <View className="rounded-full bg-green-50 px-3 py-1.5">
            <Text className="font-medium text-xs text-green-600">{item.categories.name}</Text>
          </View>
        </View>

        {/* Başlık */}
        <Text className="mb-2 font-bold text-lg text-primary">{item.articleTitle}</Text>

        {/* Özet */}
        <Text className="mb-4 text-gray-600" numberOfLines={3} style={{ lineHeight: 20 }}>
          {item.articleSummary}
        </Text>

        {/* Alt Kısım */}
        <View className="mt-auto flex-row items-center justify-end border-t border-gray-100 pt-3">
          <Text className="mr-2 font-medium text-primary">Okumaya Başla</Text>
          <View className="rounded-full bg-primary p-1">
            <Feather name="arrow-right" size={16} color="white" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-[#F8FAFF]">
      <CustomHeader title="Ara" pt={'py-[12] pl-4'} titleSize={'text-2xl'} />

      <View className="flex-1 px-4">
        {/* Arama Kutusu */}
        <View className="mb-4">
          <View className="relative">
            <TextInput
              className="rounded-xl border border-[#00095720] bg-white py-3 pl-12 pr-4 text-base"
              placeholder="Makale ara..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity className="absolute left-4 top-3" onPress={handleSearch}>
              <Ionicons name="search-outline" size={22} color="#98D8EF" />
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute right-4 top-3"
              onPress={() => setShowFilters(!showFilters)}>
              <MaterialIcons name="tune" size={22} color="#000957" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filtreler Bölümü */}
        {showFilters && (
          <View className="mb-4 rounded-xl bg-white p-4" style={platformStyles.cardShadow}>
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="font-bold text-lg text-primary">Filtreler</Text>
              <TouchableOpacity onPress={clearFilters}>
                <Text className="font-medium text-sm text-blue-500">Temizle</Text>
              </TouchableOpacity>
            </View>

            {/* Kategoriler */}
            <View className="mb-3">
              <Text className="mb-2 font-bold text-base text-primary">Kategori</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (
                  <CategoryItem key={category.id} item={category} />
                ))}
              </ScrollView>
            </View>

            {/* Türler */}
            <View className="mb-3">
              <Text className="mb-2 font-bold text-base text-primary">Metin Türü</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {textTypes.map((type) => (
                  <TypeItem key={type.id} item={type} />
                ))}
              </ScrollView>
            </View>

            {/* Seviyeler */}
            <View className="mb-1">
              <Text className="mb-2 font-bold text-base text-primary">Dil Seviyesi</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {languageLevels.map((level) => (
                  <LevelItem key={level.id} item={level} />
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Sonuçlar */}
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#000957" />
            <Text className="mt-4 font-medium text-base text-gray-600">Makaleler aranıyor...</Text>
          </View>
        ) : (
          <>
            {articles.length > 0 ? (
              <FlatList
                data={articles}
                renderItem={({ item }) => <ArticleCard item={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                  <View className="mb-4 flex-row items-center justify-between">
                    <Text className="font-bold text-lg text-primary">Sonuçlar</Text>
                    <Text className="font-medium text-sm text-gray-600">
                      {articles.length} makale bulundu
                    </Text>
                  </View>
                }
                ListEmptyComponent={
                  <View className="mt-10 items-center">
                    <Ionicons name="search-outline" size={60} color="#98D8EF" />
                    <Text className="mt-4 font-bold text-xl text-primary">Sonuç Bulunamadı</Text>
                    <Text className="mt-2 text-center text-base text-gray-600">
                      Farklı anahtar kelimelerle veya farklı filtrelerle tekrar deneyin.
                    </Text>
                  </View>
                }
              />
            ) : (
              <View className="flex-1 items-center justify-center">
                <Ionicons name="search-outline" size={60} color="#98D8EF" />
                <Text className="mt-4 font-bold text-xl text-primary">Sonuç Bulunamadı</Text>
                <Text className="mt-2 text-center text-base text-gray-600">
                  Farklı anahtar kelimelerle veya farklı filtrelerle tekrar deneyin.
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchScreen;
