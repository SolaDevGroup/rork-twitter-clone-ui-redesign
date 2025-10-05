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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { shorts as mockShorts } from '@/mocks/data';
import { Short } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  Search,
  Bell,
  MoreHorizontal,
  Play,
  Pause,
} from 'lucide-react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ShortsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [shorts, setShorts] = useState<Short[]>(mockShorts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      gap: 16,
    },
    headerText: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: 'white',
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    shortContainer: {
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
    contentContainer: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      paddingBottom: 100,
      gap: 8,
    },
    topicBadge: {
      alignSelf: 'flex-start',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    topicBadgeText: {
      fontSize: 12,
      fontWeight: '700' as const,
      color: 'white',
      letterSpacing: 1,
    },
    postTitle: {
      fontSize: 28,
      fontWeight: '700' as const,
      color: 'white',
      lineHeight: 34,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    username: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: 'white',
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statText: {
      fontSize: 13,
      fontWeight: '600' as const,
      color: 'white',
    },
    metaText: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 16,
    },
    caption: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.9)',
      lineHeight: 20,
    },

    actionsContainer: {
      position: 'absolute' as const,
      right: 16,
      bottom: 120,
      gap: 24,
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
    playPauseButton: {
      position: 'absolute' as const,
      top: '50%' as const,
      left: '50%' as const,
      marginLeft: -40,
      marginTop: -40,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const handleLike = (shortId: string) => {
    setShorts(prevShorts =>
      prevShorts.map(short =>
        short.id === shortId
          ? {
              ...short,
              isLiked: !short.isLiked,
              likes: short.isLiked ? short.likes - 1 : short.likes + 1,
            }
          : short
      )
    );
  };

  const handleComment = (short: Short) => {
    console.log('Open comments for:', short.id);
  };

  const handleShare = (short: Short) => {
    console.log('Share short:', short.id);
  };

  const handleBookmark = (short: Short) => {
    console.log('Bookmark short:', short.id);
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
        if (gestureState.dy < -50 && currentIndex < shorts.length - 1) {
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

  const renderShort = ({ item }: { item: Short }) => {
    return (
      <View style={styles.shortContainer} {...panResponder.panHandlers}>
        <View style={styles.videoPlaceholder}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        </View>

        <View style={styles.gradient}>
          <View style={{ flex: 1, backgroundColor: 'transparent' }} />
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
        </View>

        <TouchableOpacity
          style={styles.playPauseButton}
          onPress={() => setIsPlaying(!isPlaying)}
          activeOpacity={0.8}
        >
          {isPlaying ? (
            <Pause size={32} color="white" fill="white" />
          ) : (
            <Play size={32} color="white" fill="white" />
          )}
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          {item.topicDisplay && (
            <View style={styles.topicBadge}>
              <Text style={styles.topicBadgeText}>{item.topicDisplay}</Text>
            </View>
          )}

          {item.postTitle && (
            <Text style={styles.postTitle}>{item.postTitle}</Text>
          )}

          <Text style={styles.caption} numberOfLines={3}>{item.caption}</Text>

          <View style={styles.userInfo}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <Text style={styles.username}>@{item.user.username}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Heart size={16} color="white" fill={item.isLiked ? 'white' : 'none'} />
              <Text style={styles.statText}>{formatNumber(item.likes)}</Text>
            </View>
            <View style={styles.statItem}>
              <MessageCircle size={16} color="white" />
              <Text style={styles.statText}>{formatNumber(item.comments)}</Text>
            </View>
            <View style={styles.statItem}>
              <Share2 size={16} color="white" />
              <Text style={styles.statText}>{formatNumber(item.shares)}</Text>
            </View>
            {item.savedCollections !== undefined && (
              <View style={styles.statItem}>
                <Bookmark size={16} color="white" />
                <Text style={styles.statText}>Saved Collections {item.savedCollections}</Text>
              </View>
            )}
          </View>

          {item.parentGroupName && (
            <Text style={styles.metaText}>{item.parentGroupName}&apos;s Feed Post&apos;s t - {item.topicDisplay}</Text>
          )}

          {item.createdAt && (
            <Text style={styles.metaText}>Parent group&apos;s Feed Post&apos;s Creation Date formatted as {item.createdAt}</Text>
          )}
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
            onPress={() => handleComment(item)}
          >
            <View style={styles.actionIcon}>
              <MessageCircle size={28} color="white" />
            </View>
            <Text style={styles.actionText}>{formatNumber(item.comments)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBookmark(item)}
          >
            <View style={styles.actionIcon}>
              <Bookmark size={28} color="white" />
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
              <MoreHorizontal size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>
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
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>Shorts</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/(search)/search')}
          >
            <Search size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/(notifications)/notifications')}
          >
            <Bell size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/(messages)/messages')}
          >
            <MessageCircle size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={shorts}
        renderItem={renderShort}
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
