import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  PanResponder,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { liveStreams as mockLiveStreams } from '@/mocks/data';
import { LiveStream } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  X,
  Eye,
  Send,
  Gift,
  MoreVertical,
} from 'lucide-react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LiveScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>(mockLiveStreams);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    liveContainer: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      position: 'relative' as const,
    },
    videoPlaceholder: {
      width: '100%' as const,
      height: '100%' as const,
      backgroundColor: '#000',
    },
    thumbnail: {
      width: '100%' as const,
      height: '100%' as const,
    },
    gradient: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%' as const,
    },
    header: {
      position: 'absolute' as const,
      top: insets.top,
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    closeButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: '#EF4444',
    },
    username: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: 'white',
    },
    liveBadge: {
      backgroundColor: '#EF4444',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    liveBadgeText: {
      fontSize: 11,
      fontWeight: '700' as const,
      color: 'white',
      letterSpacing: 0.5,
    },
    viewerCount: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    viewerCountText: {
      fontSize: 12,
      fontWeight: '600' as const,
      color: 'white',
    },
    contentContainer: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 80,
      padding: 16,
      paddingBottom: 100,
      gap: 12,
    },
    title: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: 'white',
      lineHeight: 22,
    },
    description: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: 20,
    },
    categoryBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 12,
    },
    categoryText: {
      fontSize: 12,
      fontWeight: '600' as const,
      color: 'white',
    },
    actionsContainer: {
      position: 'absolute' as const,
      right: 16,
      bottom: 120,
      gap: 20,
    },
    actionButton: {
      alignItems: 'center',
      gap: 4,
    },
    actionIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionText: {
      fontSize: 12,
      fontWeight: '600' as const,
      color: 'white',
    },
    commentsContainer: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      maxHeight: SCREEN_HEIGHT * 0.5,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: insets.bottom,
    },
    commentsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    commentsTitle: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: 'white',
    },
    commentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 12,
      gap: 8,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    commentInput: {
      flex: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      color: 'white',
      fontSize: 14,
    },
    sendButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: '#EF4444',
      alignItems: 'center',
      justifyContent: 'center',
    },
    liveIndicator: {
      position: 'absolute' as const,
      top: insets.top + 60,
      left: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
    },
    pulseDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
    },
    liveText: {
      fontSize: 12,
      fontWeight: '700' as const,
      color: 'white',
    },
    startedAt: {
      fontSize: 11,
      color: 'rgba(255, 255, 255, 0.7)',
    },
  });

  const handleLike = (streamId: string) => {
    setLiveStreams(prevStreams =>
      prevStreams.map(stream =>
        stream.id === streamId
          ? {
              ...stream,
              isLiked: !stream.isLiked,
              likes: stream.isLiked ? stream.likes - 1 : stream.likes + 1,
            }
          : stream
      )
    );
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleShare = (stream: LiveStream) => {
    console.log('Share stream:', stream.id);
  };

  const handleGift = (stream: LiveStream) => {
    console.log('Send gift to:', stream.id);
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      console.log('Send comment:', commentText);
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50 && currentIndex < liveStreams.length - 1) {
          setCurrentIndex(currentIndex + 1);
          flatListRef.current?.scrollToIndex({
            index: currentIndex + 1,
            animated: true,
          });
        } else if (gestureState.dy > 50 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
          flatListRef.current?.scrollToIndex({
            index: currentIndex - 1,
            animated: true,
          });
        }
      },
    })
  ).current;

  const renderLiveStream = ({ item }: { item: LiveStream }) => {
    return (
      <View style={styles.liveContainer} {...panResponder.panHandlers}>
        <View style={styles.videoPlaceholder}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        </View>

        <View style={styles.gradient}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }} />
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
        </View>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.back()}
            >
              <X size={24} color="white" />
            </TouchableOpacity>

            <View style={styles.userInfo}>
              <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
              <Text style={styles.username}>@{item.user.username}</Text>
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>LIVE</Text>
              </View>
            </View>
          </View>

          <View style={styles.viewerCount}>
            <Eye size={14} color="white" />
            <Text style={styles.viewerCountText}>{formatNumber(item.viewerCount)}</Text>
          </View>
        </View>

        <View style={styles.liveIndicator}>
          <View style={styles.pulseDot} />
          <Text style={styles.liveText}>LIVE</Text>
          <Text style={styles.startedAt}>{item.startedAt}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          
          {item.description && (
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          )}

          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleLike(item.id)}
          >
            <View style={styles.actionIcon}>
              <Heart
                size={28}
                color="white"
                fill={item.isLiked ? 'white' : 'none'}
              />
            </View>
            <Text style={styles.actionText}>{formatNumber(item.likes)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleComment}
          >
            <View style={styles.actionIcon}>
              <MessageCircle size={28} color="white" />
            </View>
            <Text style={styles.actionText}>{formatNumber(item.comments)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleGift(item)}
          >
            <View style={styles.actionIcon}>
              <Gift size={28} color="white" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleShare(item)}
          >
            <View style={styles.actionIcon}>
              <Share2 size={28} color="white" />
            </View>
            <Text style={styles.actionText}>{formatNumber(item.shares)}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <MoreVertical size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>

        {showCommentInput && (
          <View style={styles.commentsContainer}>
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comments</Text>
              <TouchableOpacity onPress={() => setShowCommentInput(false)}>
                <X size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={commentText}
                onChangeText={setCommentText}
                autoFocus
              />
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendComment}
              >
                <Send size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index || 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={liveStreams}
        renderItem={renderLiveStream}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />
    </View>
  );
}
