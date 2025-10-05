import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  PanResponder,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { videos, currentUser } from '@/mocks/data';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import {
  ArrowLeft,
  Play,
  ThumbsUp,
  ThumbsDown,
  Share2,
  CheckCircle,
  Flag,
  Send,
  X,
} from 'lucide-react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MINIMIZED_HEIGHT = 100;
const MINIMIZED_WIDTH = 160;
const DRAG_THRESHOLD = 50;

export default function VideoPlayerScreen() {
  const { colors, primary } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const videoRef = useRef<Video>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isDisliked, setIsDisliked] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [videoComments, setVideoComments] = useState<{
    id: string;
    user: { name: string; avatar: string };
    content: string;
    timestamp: string;
    likes: number;
    isLiked: boolean;
  }[]>([]);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  
  const translateY = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const video = videos.find((v) => v.id === id);
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isFullscreen && !isMinimized,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 5 && !isMinimized && !isFullscreen;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0 && !isMinimized && !isFullscreen) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > DRAG_THRESHOLD && !isFullscreen) {
          minimizeVideo();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  const minimizeVideo = () => {
    setIsMinimized(true);
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT - MINIMIZED_HEIGHT - 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const maximizeVideo = () => {
    setIsMinimized(false);
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };
  
  const closeMinimizedVideo = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      router.back();
    });
  };

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    let subscription: { remove: () => void } | null = null;
    
    const setupOrientation = async () => {
      if (Platform.OS === 'web') return;
      
      try {
        await ScreenOrientation.unlockAsync();
        console.log('Screen orientation unlocked');
        
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        console.log('Current orientation:', currentOrientation);
        
        subscription = ScreenOrientation.addOrientationChangeListener((event) => {
          const orientation = event.orientationInfo.orientation;
          console.log('Orientation changed to:', orientation);
          
          if (orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT || 
              orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
            console.log('Setting fullscreen mode');
            setIsFullscreen(true);
            setIsMinimized(false);
          } else if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP || 
                     orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
            console.log('Exiting fullscreen mode');
            setIsFullscreen(false);
          }
        });
      } catch (error) {
        console.error('Error setting up orientation:', error);
      }
    };
    
    setupOrientation();
    
    return () => {
      if (currentVideoRef) {
        currentVideoRef.unloadAsync();
      }
      if (subscription) {
        subscription.remove();
      }
      if (Platform.OS !== 'web') {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(err => 
          console.error('Error locking orientation:', err)
        );
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
      width: SCREEN_WIDTH,
      aspectRatio: 16 / 9,
      backgroundColor: '#000000',
      position: 'relative',
    },
    videoContainerFullscreen: {
      width: SCREEN_HEIGHT,
      height: SCREEN_WIDTH,
      aspectRatio: undefined,
    },
    videoContainerMinimized: {
      position: 'absolute',
      bottom: 80,
      right: 16,
      width: MINIMIZED_WIDTH,
      height: MINIMIZED_HEIGHT,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      zIndex: 1000,
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
    commentsSection: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 24,
    },
    commentAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    commentInputWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    commentInput: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      maxHeight: 100,
    },
    sendButton: {
      marginLeft: 8,
    },
    commentItem: {
      flexDirection: 'row',
      marginBottom: 20,
      gap: 12,
    },
    commentContent: {
      flex: 1,
    },
    commentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      gap: 8,
    },
    commentUserName: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
    },
    commentTimestamp: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    commentText: {
      fontSize: 14,
      color: colors.text,
      lineHeight: 20,
      marginBottom: 8,
    },
    commentActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    commentActionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    commentActionText: {
      fontSize: 12,
      fontWeight: '600' as const,
      color: colors.textSecondary,
    },
    minimizedControls: {
      position: 'absolute',
      top: 4,
      right: 4,
      flexDirection: 'row',
      gap: 4,
      zIndex: 10,
    },
    minimizedButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fullscreenContainer: {
      flex: 1,
      backgroundColor: '#000000',
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

  const handleShare = () => {
    console.log('Share video:', video.id);
  };

  const handleReport = () => {
    console.log('Report video:', video.id);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar,
        },
        content: commentText,
        timestamp: 'Just now',
        likes: 0,
        isLiked: false,
      };
      setVideoComments([newComment, ...videoComments]);
      setCommentText('');
    }
  };

  const handleCommentLike = (commentId: string) => {
    setVideoComments(videoComments.map(comment => 
      comment.id === commentId 
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
    }
  };

  const relatedVideos = videos.filter((v) => v.id !== id).slice(0, 5);

  if (isFullscreen && Platform.OS !== 'web') {
    return (
      <View style={styles.fullscreenContainer}>
        <View style={[styles.videoContainer, styles.videoContainerFullscreen]}>
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
      </View>
    );
  }
  
  if (isMinimized) {
    return (
      <Animated.View
        style={[
          styles.videoContainerMinimized,
          { transform: [{ translateY: 0 }] },
        ]}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={maximizeVideo}
          activeOpacity={0.9}
        >
          <Video
            ref={videoRef}
            source={{ uri: video.videoUrl }}
            style={styles.video}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        </TouchableOpacity>
        <View style={styles.minimizedControls}>
          <TouchableOpacity
            style={styles.minimizedButton}
            onPress={handlePlayPause}
          >
            <Play size={16} color="#FFFFFF" fill={isPlaying ? '#FFFFFF' : 'none'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.minimizedButton}
            onPress={closeMinimizedVideo}
          >
            <X size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer} {...panResponder.panHandlers}>
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
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
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
              <Text style={styles.actionButtonText}>Dislike</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleShare}
            >
              <Share2 size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleReport}
            >
              <Flag size={20} color={colors.text} />
              <Text style={styles.actionButtonText}>Report</Text>
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

        <View style={styles.commentsSection}>
          <Text style={styles.sectionTitle}>Comments</Text>
          
          <View style={styles.commentInputContainer}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={styles.commentAvatar}
            />
            <View style={styles.commentInputWrapper}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor={colors.textSecondary}
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              {commentText.trim() && (
                <TouchableOpacity 
                  style={styles.sendButton}
                  onPress={handleAddComment}
                >
                  <Send size={20} color={primary} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {videoComments.map((comment) => (
            <View key={comment.id} style={styles.commentItem}>
              <Image
                source={{ uri: comment.user.avatar }}
                style={styles.commentAvatar}
              />
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentUserName}>{comment.user.name}</Text>
                  <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentActions}>
                  <TouchableOpacity 
                    style={styles.commentActionButton}
                    onPress={() => handleCommentLike(comment.id)}
                  >
                    <ThumbsUp
                      size={14}
                      color={comment.isLiked ? primary : colors.textSecondary}
                      fill={comment.isLiked ? primary : 'none'}
                    />
                    {comment.likes > 0 && (
                      <Text style={[styles.commentActionText, comment.isLiked && { color: primary }]}>
                        {comment.likes}
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.commentActionButton}>
                    <Text style={styles.commentActionText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

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
    </Animated.View>
  );
}
