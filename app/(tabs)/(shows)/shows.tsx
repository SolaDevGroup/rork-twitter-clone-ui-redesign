import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { videos, creators } from '@/mocks/data';
import { Video } from '@/types';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AnimatedSearchBar from '@/components/AnimatedSearchBar';

const { width } = Dimensions.get('window');
const CARD_WIDTH_SMALL = width * 0.32;
const CARD_HEIGHT_SMALL = CARD_WIDTH_SMALL * 1.5;
const CARD_WIDTH_MEDIUM = width * 0.45;
const CARD_HEIGHT_MEDIUM = CARD_WIDTH_MEDIUM * 1.4;
const CARD_WIDTH_LARGE = (width - 48) / 2;
const CARD_HEIGHT_LARGE = CARD_WIDTH_LARGE;
const CREATOR_SIZE = (width - 80) / 4;

type CardType = 'small' | 'medium' | 'large' | 'creator';

const CATEGORIES: {
  id: string;
  name: string;
  videos?: Video[];
  creators?: typeof creators;
  cardType: CardType;
}[] = [
  { id: 'continue', name: 'Continue Watching', videos: videos.slice(0, 3), cardType: 'medium' },
  { id: 'trending', name: 'Trending Now', videos: videos.slice(0, 4), cardType: 'medium' },
  { id: 'popular', name: 'Popular on Shows', videos: videos.slice(2, 6), cardType: 'small' },
  { id: 'technology', name: 'Technology', videos: videos.filter(v => v.category === 'Technology'), cardType: 'large' },
  { id: 'creators', name: 'Top Creators', creators: creators, cardType: 'creator' },
  { id: 'entertainment', name: 'Entertainment', videos: videos.filter(v => v.category === 'Entertainment'), cardType: 'small' },
  { id: 'fashion', name: 'Fashion & Design', videos: videos.filter(v => v.category === 'Fashion'), cardType: 'medium' },
];

export default function ShowsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = searchQuery
    ? CATEGORIES.map(cat => ({
        ...cat,
        videos: cat.videos?.filter(v => 
          v.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => (cat.videos && cat.videos.length > 0) || (cat.creators && cat.creators.length > 0))
    : CATEGORIES;

  const renderVideoCard = (video: Video, cardType: CardType) => {
    let cardStyle, thumbnailStyle;
    
    switch (cardType) {
      case 'small':
        cardStyle = styles.videoCardSmall;
        thumbnailStyle = styles.cardThumbnailSmall;
        break;
      case 'medium':
        cardStyle = styles.videoCardMedium;
        thumbnailStyle = styles.cardThumbnailMedium;
        break;
      case 'large':
        cardStyle = styles.videoCardLarge;
        thumbnailStyle = styles.cardThumbnailLarge;
        break;
      default:
        cardStyle = styles.videoCardSmall;
        thumbnailStyle = styles.cardThumbnailSmall;
    }

    return (
      <TouchableOpacity
        key={video.id}
        style={cardStyle}
        onPress={() => router.push(`/video-player?id=${video.id}`)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: video.thumbnail }}
          style={thumbnailStyle}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  const renderCreatorCard = (creator: typeof creators[0]) => (
    <TouchableOpacity
      key={creator.id}
      style={styles.creatorCard}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: creator.avatar }}
        style={styles.creatorAvatar}
        resizeMode="cover"
      />
      <Text style={[styles.creatorName, { color: colors.text }]} numberOfLines={1}>
        {creator.name}
      </Text>
    </TouchableOpacity>
  );

  const renderCategory = (category: typeof CATEGORIES[0]) => {
    if (category.cardType === 'creator') {
      if (!category.creators || category.creators.length === 0) return null;
      
      return (
        <View key={category.id} style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: colors.text }]}>
            {category.name}
          </Text>
          <FlatList
            horizontal
            data={category.creators}
            renderItem={({ item }) => renderCreatorCard(item)}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>
      );
    }

    if (!category.videos || category.videos.length === 0) return null;

    if (category.cardType === 'large') {
      return (
        <View key={category.id} style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: colors.text }]}>
            {category.name}
          </Text>
          <View style={styles.largeCardGrid}>
            {category.videos.slice(0, 4).map((video) => renderVideoCard(video, 'large'))}
          </View>
        </View>
      );
    }

    return (
      <View key={category.id} style={styles.categorySection}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {category.name}
        </Text>
        <FlatList
          horizontal
          data={category.videos}
          renderItem={({ item }) => renderVideoCard(item, category.cardType)}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: insets.top + 8,
      paddingBottom: 12,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: {
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: colors.text,
      marginBottom: 12,
    },
    uploadButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },
    content: {
      paddingBottom: 100,
    },
    categorySection: {
      marginBottom: 24,
    },
    categoryTitle: {
      fontSize: 18,
      fontWeight: '700' as const,
      marginBottom: 12,
      paddingHorizontal: 16,
    },
    categoryList: {
      paddingHorizontal: 16,
    },
    videoCardSmall: {
      width: CARD_WIDTH_SMALL,
      marginRight: 8,
    },
    cardThumbnailSmall: {
      width: CARD_WIDTH_SMALL,
      height: CARD_HEIGHT_SMALL,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    videoCardMedium: {
      width: CARD_WIDTH_MEDIUM,
      marginRight: 8,
    },
    cardThumbnailMedium: {
      width: CARD_WIDTH_MEDIUM,
      height: CARD_HEIGHT_MEDIUM,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    videoCardLarge: {
      width: CARD_WIDTH_LARGE,
      marginBottom: 12,
    },
    cardThumbnailLarge: {
      width: CARD_WIDTH_LARGE,
      height: CARD_HEIGHT_LARGE,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    largeCardGrid: {
      paddingHorizontal: 16,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    creatorCard: {
      width: CREATOR_SIZE,
      marginRight: 12,
      alignItems: 'center',
    },
    creatorAvatar: {
      width: CREATOR_SIZE,
      height: CREATOR_SIZE,
      borderRadius: 1000,
      backgroundColor: colors.surface,
      marginBottom: 8,
    },
    creatorName: {
      fontSize: 12,
      fontWeight: '500' as const,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Shows</Text>
          <AnimatedSearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            topics={['Search videos', 'Search shows', 'Search channels', 'Search creators']}
          />
        </View>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => router.push('/upload-video')}
          activeOpacity={0.7}
        >
          <Plus size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredCategories.map(renderCategory)}
      </ScrollView>
    </View>
  );
}