# ReadceAi Mobile Uygulama Tasarımı

## Proje Genel Bakış

ReadceAi, dil öğrenimine yardımcı olmak için tasarlanmış bir mobil uygulamadır. Kullanıcıların makaleler okuyabilmesi, kelime anlamlarına bakabilmesi ve dil becerilerini geliştirmesi için çeşitli özellikler sunar.

## Mimari Yapı

### Klasör Yapısı

```
ReadceAiMobile/
├── assets/               # Görseller, fontlar ve diğer statik dosyalar
├── src/                  # Kaynak kodlar
│   ├── components/       # Yeniden kullanılabilir bileşenler
│   ├── screens/          # Uygulama ekranları
│   │   └── Auth/         # Kimlik doğrulama ekranları
│   ├── navigation/       # Navigasyon yapılandırması
│   ├── Redux/            # State yönetimi
│   │   ├── Slices/       # Redux slice'ları
│   │   └── Store/        # Redux store yapılandırması
│   ├── services/         # API servisleri
│   ├── utils/            # Yardımcı fonksiyonlar
│   ├── types/            # Typescript tipleri
│   ├── context/          # React context'leri
│   └── AppContent.tsx    # Ana uygulama yapısı
├── App.tsx               # Uygulama giriş noktası
└── global.css            # Global stiller
```

### Teknoloji Yığını

- **React Native**: Çapraz platform mobil geliştirme için
- **Expo**: Daha kolay geliştirme ve dağıtım için
- **React Navigation**: Ekranlar arası gezinme için
- **Redux Toolkit**: State yönetimi için
- **React Query**: Sunucu durumu yönetimi için
- **NativeWind/Tailwind CSS**: Stil yönetimi için
- **TypeScript**: Tip güvenliği için

## Ana Bileşenler

### Kimlik Doğrulama Sistemi

- Kullanıcı kaydı, girişi ve misafir girişi özellikleri
- `authSlice.ts` dosyası ile Redux üzerinden yönetilen kimlik bilgileri
- AsyncStorage kullanarak oturum kalıcılığı sağlama

### Navigasyon Yapısı

- `AuthNavigator`: Kimlik doğrulama ekranları için
- `TabNavigator`: Ana uygulama ekranları için tab tabanlı navigasyon
- Yetkilendirme durumuna göre koşullu navigasyon

### Ekranlar

- **SplashScreen**: Açılış ekranı
- **HomeScreen**: Ana sayfa
- **ExploreScreen**: Keşif ekranı
- **ArticleDetailScreen**: Makale detay sayfası
- **DictionaryScreen**: Sözlük sayfası
- **ProfileScreen**: Profil sayfası
- **SearchScreen**: Arama sayfası
- **CreateScreen**: İçerik oluşturma sayfası

### API Servisleri

- `apiWord.ts`: Kelime arama ve sözlük işlemleri için
- `apiArticleDetail.ts`: Makale detayları için
- `apiExplore.ts`: Keşif özelliği için

## Stil Kılavuzu

### Renk Paleti

- Primary: #0000ff (Mavi tonları)
- Background: #FFFFFF
- Text: #000957
- Accent: #98D8EF

### Tipografi

- Ana font: 'Poppins' (Regular, Medium, SemiBold, Bold)
- Başlıklar: Poppins-Bold
- Normal metin: Poppins-Regular
- Vurgulu metin: Poppins-Medium

## Geliştirme Prensipleri

### Kod Yazım Kuralları

- Komponent isimlendirmede PascalCase
- Fonksiyon ve değişken isimlendirmede camelCase
- 2 boşluk girinti kullanımı
- JSX için tek tırnak kullanımı
- Dosya sonlarında yeni satır
- Trailing whitespace temizliği

### State Yönetimi

- Global uygulama durumu için Redux Toolkit
- Sunucu durumu ve önbellek için React Query
- Lokal komponent durumu için React useState
- React context'in sınırlı kullanımı

### Performans Optimizasyonu

- Gereksiz render'ları önlemek için memoization (React.memo, useMemo, useCallback)
- Lazy loading ve code splitting
- İmaj optimizasyonu ve önbelleğe alma

## Güvenlik Önlemleri

- Kimlik doğrulama için güvenli token yönetimi
- API isteklerinde güvenlik kontrolü
- Hassas verilerin cihazda güvenli saklanması

## Gelecek Geliştirmeler

- Çevrimdışı mod desteği
- Push notification entegrasyonu
- Sosyal medya paylaşım özellikleri
- Gelişmiş arama filtreleri
- İleri düzey kişiselleştirme seçenekleri
