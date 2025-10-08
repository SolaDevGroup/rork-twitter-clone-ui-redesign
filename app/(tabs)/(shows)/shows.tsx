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
import { Tag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AnimatedSearchBar from '@/components/AnimatedSearchBar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 240;
const CARD_HEIGHT = 135;
const CREATOR_SIZE = (width - 80) / 4;

type CardType = 'horizontal' | 'creator';

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
  { id: 'continue', name: 'Continue Watching', videos: videos.slice(0, 6), cardType: 'horizontal', headingStyle: 'default' },
  { 
    id: 'trending', 
    name: 'Top MEETUPS', 
    subtitle: 'Best Of 2025',
    videos: videos.slice(0, 6), 
    cardType: 'horizontal',
    headingStyle: 'withSubtitle'
  },
  { id: 'popular', name: 'Popular on Shows', videos: videos.slice(2, 8), cardType: 'horizontal', headingStyle: 'default' },
  { 
    id: 'daily', 
    name: 'Electronics', 
    subtitle: 'Your Daily Update\nAbout',
    videos: videos.slice(0, 6), 
    cardType: 'horizontal',
    headingStyle: 'withSubtitle'
  },
  { 
    id: 'deals', 
    name: 'New Deals', 
    videos: videos.slice(1, 7), 
    cardType: 'horizontal',
    headingStyle: 'withIcon',
    icon: 'tag'
  },
  { id: 'technology', name: 'Technology', videos: videos.filter(v => v.category === 'Technology'), cardType: 'horizontal', headingStyle: 'default' },
  { id: 'creators', name: 'Top Creators', creators: creators, cardType: 'creator', headingStyle: 'default' },
  { id: 'entertainment', name: 'Entertainment', videos: videos.filter(v => v.category === 'Entertainment'), cardType: 'horizontal', headingStyle: 'default' },
  { id: 'fashion', name: 'Fashion & Design', videos: videos.filter(v => v.category === 'Fashion'), cardType: 'horizontal', headingStyle: 'default' },
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

  const renderVideoCard = (video: Video) => {
    return (
      <TouchableOpacity
        key={video.id}
        style={styles.videoCard}
        onPress={() => router.push(`/video-player?id=${video.id}`)}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: video.thumbnail || '' }}
          style={styles.cardThumbnail}
          resizeMode="cover"
        />
        <View style={styles.cardInfo}>
          <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.cardMeta}>
            <Text style={[styles.cardMetaText, { color: colors.textSecondary }]}>
              {video.views} views
            </Text>
            <Text style={[styles.cardMetaText, { color: colors.textSecondary }]}> • </Text>
            <Text style={[styles.cardMetaText, { color: colors.textSecondary }]}>
              {video.category || 'General'}
            </Text>
            <Text style={[styles.cardMetaText, { color: colors.textSecondary }]}> • </Text>
            <Text style={[styles.cardMetaText, { color: colors.textSecondary }]}>
              {video.uploadedAt}
            </Text>
          </View>
        </View>
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
        source={{ uri: creator.avatar || '' }}
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
      }
      return null;
    }

    if (!category.videos || category.videos.length === 0) return null;

    return (
      <View key={category.id} style={styles.categorySection}>
        {renderHeading(category)}
        <FlatList
          horizontal
          data={category.videos}
          renderItem={({ item }) => renderVideoCard(item)}
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
    videoCard: {
      width: CARD_WIDTH,
      marginRight: 12,
    },
    cardThumbnail: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 8,
      backgroundColor: colors.surface,
      marginBottom: 8,
    },
    cardInfo: {
      width: CARD_WIDTH,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: '600' as const,
      marginBottom: 4,
      lineHeight: 18,
    },
    cardMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    cardMetaText: {
      fontSize: 12,
      fontWeight: '400' as const,
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