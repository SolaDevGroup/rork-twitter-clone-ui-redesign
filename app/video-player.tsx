import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { videos } from '@/mocks/data';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import {
  ArrowLeft,
  Play,
  ThumbsUp,
  ThumbsDown,
  Share2,
  CheckCircle,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function VideoPlayerScreen() {
  const { colors, primary } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const videoRef = useRef<Video>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);

  const video = videos.find((v) => v.id === id);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    return () => {
      if (currentVideoRef) {
        currentVideoRef.unloadAsync();
      }
    };
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 16,
    },
    backButtonHeader: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoContainer: {
      width: width,
      aspectRatio: 16 / 9,
      backgroundColor: '#000000',
      position: 'relative',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    playPauseOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    playPauseButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    videoInfoSection: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    videoTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
      lineHeight: 24,
    },
    videoStats: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: colors.inputBackground,
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
    },
    channelSection: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    channelAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
    },
    channelInfo: {
      flex: 1,
    },
    channelNameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      marginBottom: 4,
    },
    channelName: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text,
    },
    channelCategory: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    descriptionSection: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
    },
    relatedSection: {
      padding: 16,
    },
    relatedVideoCard: {
      flexDirection: 'row',
      marginBottom: 16,
      gap: 12,
    },
    relatedThumbnail: {
      width: 168,
      aspectRatio: 16 / 9,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },
    relatedVideoInfo: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    relatedVideoTitle: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 4,
      lineHeight: 18,
    },
    relatedChannelName: {
      fontSize: 13,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    relatedVideoMeta: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      fontSize: 18,
      fontWeight: '600' as const,
      marginBottom: 20,
    },
    backButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    backButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600' as const,
    },
  });

  if (!video) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.text }]}>Video not found</Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: primary }]}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handlePlayPause = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      await videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked) setIsDisliked(false);
  };

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked) setIsLiked(false);
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  const relatedVideos = videos.filter((v) => v.id !== id).slice(0, 5);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: video.videoUrl }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        />
        <TouchableOpacity
          style={styles.playPauseOverlay}
          onPress={handlePlayPause}
          activeOpacity={1}
        >
          {!isPlaying && (
            <View style={styles.playPauseButton}>
              <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.videoInfoSection}>
          <Text style={styles.videoTitle}>{video.title}</Text>
          <Text style={styles.videoStats}>
            {video.views} views • {video.uploadedAt}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLike}
            >
              <ThumbsUp
                size={20}
                color={isLiked ? primary : colors.text}
                fill={isLiked ? primary : 'none'}
              />
              <Text style={[styles.actionButtonText, isLiked && { color: primary }]}>
                {video.likes ? `${(video.likes / 1000).toFixed(1)}K` : 'Like'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleDislike}
            >
              <ThumbsDown
                size={20}
                color={isDisliked ? primary : colors.text}
                fill={isDisliked ? primary : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Share2 size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.channelSection}>
          <Image
            source={{ uri: video.channel.avatar }}
            style={styles.channelAvatar}
          />
          <View style={styles.channelInfo}>
            <View style={styles.channelNameRow}>
              <Text style={styles.channelName}>{video.channel.name}</Text>
              {video.channel.isVerified && (
                <CheckCircle size={16} color={primary} fill={primary} />
              )}
            </View>
            <Text style={styles.channelCategory}>{video.category}</Text>
          </View>
        </View>

        {video.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{video.description}</Text>
          </View>
        )}

        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>Related Videos</Text>
          {relatedVideos.map((relatedVideo) => (
            <TouchableOpacity
              key={relatedVideo.id}
              style={styles.relatedVideoCard}
              onPress={() => router.push(`/video-player?id=${relatedVideo.id}`)}
            >
              <Image
                source={{ uri: relatedVideo.thumbnail }}
                style={styles.relatedThumbnail}
              />
              <View style={styles.relatedVideoInfo}>
                <Text style={styles.relatedVideoTitle} numberOfLines={2}>
                  {relatedVideo.title}
                </Text>
                <Text style={styles.relatedChannelName}>
                  {relatedVideo.channel.name}
                </Text>
                <Text style={styles.relatedVideoMeta}>
                  {relatedVideo.views} views • {relatedVideo.uploadedAt}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
