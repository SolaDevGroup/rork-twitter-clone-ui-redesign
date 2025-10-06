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
import { Plus, Tag } from 'lucide-react-native';
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
const CARD_WIDTH_RECT = width - 32;
const CARD_HEIGHT_RECT = CARD_WIDTH_RECT * 0.56;

type CardType = 'small' | 'medium' | 'large' | 'creator' | 'rectangular';

type HeadingStyle = 'default' | 'withSubtitle' | 'withIcon' | 'numbered';

const CATEGORIES: {
  id: string;
  name: string;
  subtitle?: string;
  videos?: Video[];
  creators?: typeof creators;
  cardType: CardType;
  headingStyle?: HeadingStyle;
  icon?: string;
}[] = [
  { id: 'continue', name: 'Continue Watching', videos: videos.slice(0, 3), cardType: 'medium', headingStyle: 'default' },
  { 
    id: 'trending', 
    name: 'Top MEETUPS', 
    subtitle: 'Best Of 2025',
    videos: videos.slice(0, 4), 
    cardType: 'rectangular',
    headingStyle: 'withSubtitle'
  },
  { id: 'popular', name: 'Popular on Shows', videos: videos.slice(2, 6), cardType: 'small', headingStyle: 'default' },
  { 
    id: 'daily', 
    name: 'Electronics', 
    subtitle: 'Your Daily Update\nAbout',
    videos: videos.slice(0, 3), 
    cardType: 'rectangular',
    headingStyle: 'withSubtitle'
  },
  { 
    id: 'deals', 
    name: 'New Deals', 
    videos: videos.slice(1, 5), 
    cardType: 'creator',
    headingStyle: 'withIcon',
    icon: 'tag'
  },
  { 
    id: 'dealsRect', 
    name: 'Deals', 
    subtitle: 'You Would Not Like To Miss!',
    videos: videos.slice(2, 4), 
    cardType: 'rectangular',
    headingStyle: 'withIcon',
    icon: 'tag'
  },
  { 
    id: 'topAsia', 
    name: 'Asia', 
    subtitle: 'Top 10 In',
    videos: videos.slice(0, 4), 
    cardType: 'rectangular',
    headingStyle: 'numbered'
  },
  { 
    id: 'jamaica', 
    name: 'Love These', 
    subtitle: 'People From Jamaica',
    videos: videos.slice(1, 3), 
    cardType: 'rectangular',
    headingStyle: 'withIcon',
    icon: 'tag'
  },
  { id: 'technology', name: 'Technology', videos: videos.filter(v => v.category === 'Technology'), cardType: 'large', headingStyle: 'default' },
  { id: 'creators', name: 'Top Creators', creators: creators, cardType: 'creator', headingStyle: 'default' },
  { id: 'entertainment', name: 'Entertainment', videos: videos.filter(v => v.category === 'Entertainment'), cardType: 'small', headingStyle: 'default' },
  { id: 'fashion', name: 'Fashion & Design', videos: videos.filter(v => v.category === 'Fashion'), cardType: 'medium', headingStyle: 'default' },
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

  const renderVideoCard = (video: Video, cardType: CardType, index?: number) => {
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
      case 'rectangular':
        cardStyle = styles.videoCardRect;
        thumbnailStyle = styles.cardThumbnailRect;
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
        {index !== undefined && (
          <View style={styles.numberBadge}>
            <Text style={styles.numberText}>{index + 1}</Text>
          </View>
        )}
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

  const renderHeading = (category: typeof CATEGORIES[0]) => {
    const headingStyle = category.headingStyle || 'default';

    switch (headingStyle) {
      case 'withSubtitle':
        return (
          <View style={styles.headingContainer}>
            {category.subtitle && (
              <Text style={[styles.categorySubtitle, { color: colors.textSecondary }]}>
                {category.subtitle}
              </Text>
            )}
            <View style={styles.headingRow}>
              <Text style={[styles.categoryTitleLarge, { color: colors.text }]}>
                {category.name}
              </Text>
              <TouchableOpacity onPress={() => router.push(`/video-listing?category=${category.name}`)}>
                <Text style={[styles.seeMore, { color: colors.textSecondary }]}>SEE MORE</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'withIcon':
        return (
          <View style={styles.headingContainer}>
            {category.subtitle && (
              <Text style={[styles.categorySubtitle, { color: colors.textSecondary }]}>
                {category.subtitle}
              </Text>
            )}
            <View style={styles.headingRow}>
              <View style={styles.headingWithIcon}>
                {category.icon === 'tag' && <Tag size={24} color={colors.text} />}
                <Text style={[styles.categoryTitleLarge, { color: colors.text, marginLeft: 8 }]}>
                  {category.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push(`/video-listing?category=${category.name}`)}>
                <Text style={[styles.seeMore, { color: colors.textSecondary }]}>SEE MORE</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      case 'numbered':
        return (
          <View style={styles.headingContainer}>
            {category.subtitle && (
              <Text style={[styles.categorySubtitle, { color: colors.textSecondary }]}>
                {category.subtitle}
              </Text>
            )}
            <View style={styles.headingRow}>
              <Text style={[styles.categoryTitleLarge, { color: colors.text }]}>
                {category.name}
              </Text>
              <TouchableOpacity onPress={() => router.push(`/video-listing?category=${category.name}`)}>
                <Text style={[styles.seeMore, { color: colors.textSecondary }]}>SEE MORE</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      
      default:
        return (
          <Text style={[styles.categoryTitle, { color: colors.text }]}>
            {category.name}
          </Text>
        );
    }
  };

  const renderCategory = (category: typeof CATEGORIES[0]) => {
    if (category.cardType === 'creator') {
      if (category.creators) {
        return (
          <View key={category.id} style={styles.categorySection}>
            {renderHeading(category)}
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
      } else if (category.videos && category.videos.length > 0) {
        return (
          <View key={category.id} style={styles.categorySection}>
            {renderHeading(category)}
            <FlatList
              horizontal
              data={category.videos}
              renderItem={({ item }) => (
                <View style={styles.creatorCard}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.creatorAvatar}
                    resizeMode="cover"
                  />
                </View>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            />
          </View>
        );
      }
      return null;
    }

    if (!category.videos || category.videos.length === 0) return null;

    if (category.cardType === 'large') {
      return (
        <View key={category.id} style={styles.categorySection}>
          {renderHeading(category)}
          <View style={styles.largeCardGrid}>
            {category.videos.slice(0, 4).map((video) => renderVideoCard(video, 'large'))}
          </View>
        </View>
      );
    }

    if (category.cardType === 'rectangular') {
      const showNumbers = category.headingStyle === 'numbered';
      return (
        <View key={category.id} style={styles.categorySection}>
          {renderHeading(category)}
          <View style={styles.rectangularContainer}>
            {category.videos.slice(0, 4).map((video, index) => 
              renderVideoCard(video, 'rectangular', showNumbers ? index : undefined)
            )}
          </View>
        </View>
      );
    }

    return (
      <View key={category.id} style={styles.categorySection}>
        {renderHeading(category)}
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
    headingContainer: {
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    headingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headingWithIcon: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categorySubtitle: {
      fontSize: 14,
      fontWeight: '400' as const,
      marginBottom: 4,
    },
    categoryTitleLarge: {
      fontSize: 24,
      fontWeight: '700' as const,
    },
    seeMore: {
      fontSize: 14,
      fontWeight: '600' as const,
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
    videoCardRect: {
      width: CARD_WIDTH_RECT,
      marginBottom: 12,
      position: 'relative',
    },
    cardThumbnailRect: {
      width: CARD_WIDTH_RECT,
      height: CARD_HEIGHT_RECT,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
    rectangularContainer: {
      paddingHorizontal: 16,
    },
    numberBadge: {
      position: 'absolute',
      left: -8,
      top: '50%',
      transform: [{ translateY: -30 }],
      zIndex: 10,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    numberText: {
      fontSize: 48,
      fontWeight: '700' as const,
      color: colors.textSecondary,
      opacity: 0.5,
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