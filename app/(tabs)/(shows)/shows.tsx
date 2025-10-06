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

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { videos } from '@/mocks/data';
import { Video } from '@/types';
import { Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import AnimatedSearchBar from '@/components/AnimatedSearchBar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.32;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const CATEGORIES = [
  { id: 'trending', name: 'Trending Now', videos: videos.slice(0, 4) },
  { id: 'technology', name: 'Technology', videos: videos.filter(v => v.category === 'Technology') },
  { id: 'entertainment', name: 'Entertainment', videos: videos.filter(v => v.category === 'Entertainment') },
  { id: 'fashion', name: 'Fashion & Design', videos: videos.filter(v => v.category === 'Fashion') },
  { id: 'popular', name: 'Popular on Shows', videos: videos.slice(2, 6) },
];

export default function ShowsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = searchQuery
    ? CATEGORIES.map(cat => ({
        ...cat,
        videos: cat.videos.filter(v => 
          v.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.videos.length > 0)
    : CATEGORIES;

  const renderVideoCard = (video: Video) => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoCard}
      onPress={() => router.push(`/video-player?id=${video.id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.cardThumbnail}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderCategory = (category: typeof CATEGORIES[0]) => {
    if (category.videos.length === 0) return null;

    return (
      <View key={category.id} style={styles.categorySection}>
        <Text style={[styles.categoryTitle, { color: colors.text }]}>
          {category.name}
        </Text>
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
      paddingTop: 8,
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
    videoCard: {
      width: CARD_WIDTH,
      marginRight: 8,
    },
    cardThumbnail: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
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
    </SafeAreaView>
  );
}