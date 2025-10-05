import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { videos } from '@/mocks/data';
import { Video } from '@/types';
import { Search, CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const TOPICS = ['All', 'Music', 'Gaming', 'Sports', 'News', 'Education', 'Entertainment', 'Technology', 'Fashion', 'Food'];

export default function ShowsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || video.category === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  const renderVideoCard = (video: Video) => (
    <TouchableOpacity
      key={video.id}
      style={styles.videoCard}
      onPress={() => router.push(`/video-player?id=${video.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={{ uri: video.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <Image
          source={{ uri: video.channel.avatar }}
          style={styles.channelAvatarOverlay}
        />
        {Platform.OS !== 'web' ? (
          <BlurView intensity={20} style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </BlurView>
        ) : (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>
        )}
      </View>

      <View style={styles.videoInfo}>
        <View style={styles.videoDetails}>
          <Text
            style={[styles.videoTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {video.title}
          </Text>
          <View style={styles.channelRow}>
            <Text style={[styles.channelName, { color: colors.textSecondary }]}>
              {video.channel.name}
            </Text>
            {video.channel.isVerified && (
              <CheckCircle size={14} color={colors.textSecondary} fill={colors.textSecondary} />
            )}
          </View>
          <Text style={[styles.videoMeta, { color: colors.textSecondary }]}>
            {video.views} views • {video.uploadedAt}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
    },
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: colors.text,
      marginBottom: 12,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 44,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: colors.text,
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 100,
    },
    videoCard: {
      marginBottom: 24,
      maxWidth: 240,
    },
    thumbnailContainer: {
      width: 240,
      height: 135,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    durationBadge: {
      position: 'absolute',
      bottom: 8,
      right: 8,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 1000,
      backgroundColor: Platform.OS === 'web' ? 'rgba(0, 0, 0, 0.16)' : 'rgba(0, 0, 0, 0.16)',
      overflow: 'hidden',
    },
    durationText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600' as const,
    },
    videoInfo: {
      flexDirection: 'row',
      marginTop: 12,
      gap: 12,
    },
    channelAvatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    channelAvatarOverlay: {
      position: 'absolute',
      top: 8,
      left: 8,
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: '#FFFFFF',
    },
    videoDetails: {
      flex: 1,
    },
    videoTitle: {
      fontSize: 14,
      fontWeight: '500' as const,
      lineHeight: 20,
      marginBottom: 4,
      maxWidth: 240,
    },
    channelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 2,
    },
    channelName: {
      fontSize: 14,
      fontWeight: '500' as const,
    },
    videoMeta: {
      fontSize: 13,
    },
    topicsContainer: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: colors.background,
    },
    topicsScrollView: {
      flexDirection: 'row',
    },
    topicButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      marginRight: 8,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    topicButtonActive: {
      backgroundColor: colors.text,
    },
    topicText: {
      fontSize: 13,
      fontWeight: '500' as const,
      color: colors.text,
    },
    topicTextActive: {
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Shows</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search videos"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.topicsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicsScrollView}
        >
          {TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.topicButton,
                selectedTopic === topic && styles.topicButtonActive,
              ]}
              onPress={() => setSelectedTopic(topic)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.topicText,
                  selectedTopic === topic && styles.topicTextActive,
                ]}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredVideos.map(renderVideoCard)}
      </ScrollView>
    </SafeAreaView>
  );
}