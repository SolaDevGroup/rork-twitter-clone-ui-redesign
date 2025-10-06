import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { videos } from '@/mocks/data';
import { Video } from '@/types';
import { Search, X } from 'lucide-react-native';

const TOPICS = [
  'All',
  'Technology',
  'Entertainment',
  'Fashion',
  'Design',
  'Development',
  'Mobile',
  'Web',
  'AI',
  'Startup',
];

export default function VideoListingScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoryParam = params.category as string | undefined;

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>(categoryParam || 'All');

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = searchQuery
      ? video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesTopic =
      selectedTopic === 'All' ? true : video.category === selectedTopic;

    return matchesSearch && matchesTopic;
  });

  const renderVideoCard = (video: Video) => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoCard}
      onPress={() => router.push(`/video-player?id=${video.id}`)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: video.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.videoInfo}>
        <View style={styles.channelRow}>
          <Image
            source={{ uri: video.channel.avatar }}
            style={styles.channelAvatar}
            resizeMode="cover"
          />
          <View style={styles.videoDetails}>
            <Text style={[styles.videoTitle, { color: colors.text }]} numberOfLines={2}>
              {video.title}
            </Text>
            <View style={styles.metaRow}>
              <Text style={[styles.channelName, { color: colors.textSecondary }]}>
                {video.channel.name}
              </Text>
              {video.channel.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedText}>✓</Text>
                </View>
              )}
            </View>
            <Text style={[styles.videoMeta, { color: colors.textSecondary }]}>
              {video.views} views • {video.uploadedAt}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTopicChip = (topic: string) => {
    const isSelected = selectedTopic === topic;
    return (
      <TouchableOpacity
        key={topic}
        style={[
          styles.topicChip,
          {
            backgroundColor: isSelected ? colors.text : colors.surface,
          },
        ]}
        onPress={() => setSelectedTopic(topic)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.topicText,
            {
              color: isSelected ? colors.background : colors.text,
              fontWeight: isSelected ? '600' : '500',
            },
          ]}
        >
          {topic}
        </Text>
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 8,
      backgroundColor: colors.background,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
      marginBottom: 12,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    clearButton: {
      padding: 4,
    },
    topicsContainer: {
      paddingVertical: 8,
    },
    topicsContent: {
      paddingHorizontal: 16,
    },
    topicChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
    },
    topicText: {
      fontSize: 14,
    },
    content: {
      paddingBottom: 100,
    },
    videoCard: {
      marginBottom: 16,
      paddingHorizontal: 16,
    },
    thumbnail: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      backgroundColor: colors.surface,
      marginBottom: 12,
    },
    videoInfo: {
      flex: 1,
    },
    channelRow: {
      flexDirection: 'row',
    },
    channelAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surface,
      marginRight: 12,
    },
    videoDetails: {
      flex: 1,
    },
    videoTitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
      marginBottom: 4,
    },
    metaRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 2,
    },
    channelName: {
      fontSize: 14,
      fontWeight: '500' as const,
      marginRight: 4,
    },
    verifiedBadge: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.text,
      justifyContent: 'center',
      alignItems: 'center',
    },
    verifiedText: {
      fontSize: 10,
      color: colors.background,
      fontWeight: '700' as const,
    },
    videoMeta: {
      fontSize: 13,
      fontWeight: '400' as const,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    },
    emptyText: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: categoryParam || 'Videos',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />

      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
              activeOpacity={0.7}
            >
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        horizontal
        data={TOPICS}
        renderItem={({ item }) => renderTopicChip(item)}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topicsContent}
        style={styles.topicsContainer}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredVideos.length > 0 ? (
          filteredVideos.map(renderVideoCard)
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No videos found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
