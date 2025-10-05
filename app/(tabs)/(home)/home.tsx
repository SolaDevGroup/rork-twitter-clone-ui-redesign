import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Image,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { PostCard } from '@/components/PostCard';
import { posts as mockPosts, trendingTopics, currentUser, stories as mockStories } from '@/mocks/data';
import { Post, TrendingTopic, Story } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, Sparkles, TrendingUp, Users, Bell, Search, MessageCircle, ArrowUp, MessageSquare, Repeat, Bookmark, Hash } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';

type FeedFilter = 'for-you' | 'following' | 'trending';

export default function HomeScreen() {
  const { colors, primary, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [stories] = useState<Story[]>(mockStories);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      borderBottomWidth: 1,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    headerText: {
      fontSize: 20,
      fontWeight: '600' as const,
    },
    headerTextActive: {
      opacity: 1,
    },
    headerTextInactive: {
      opacity: 0.64,
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
    storiesSection: {
      paddingVertical: 16,
    },
    storiesContainer: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    },
    storyContainer: {
      alignItems: 'center',
      marginRight: 16,
      width: 70,
    },
    storyImageContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      padding: 3,
      position: 'relative' as const,
    },
    storyRing: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    storyImageWrapper: {
      width: '100%' as const,
      height: '100%' as const,
      borderRadius: 29,
      overflow: 'hidden' as const,
      position: 'relative' as const,
    },
    storyImage: {
      width: '100%' as const,
      height: '100%' as const,
    },
    storyGradient: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    addStoryButton: {
      position: 'absolute' as const,
      bottom: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyName: {
      fontSize: 12,
      marginTop: 4,
      textAlign: 'center' as const,
    },
    filtersContainer: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingBottom: 16,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      marginRight: 12,
    },
    filterButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterText: {
      fontSize: 14,
      fontWeight: '500' as const,
    },
    feedContainer: {
      paddingBottom: 100,
    },
    fab: {
      position: 'absolute' as const,
      bottom: 20,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    createModalContent: {
      width: '90%' as const,
      maxWidth: 400,
      borderRadius: 12,
      padding: 20,
    },
    createModalTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      textAlign: 'center' as const,
      marginBottom: 20,
    },
    createPostInput: {
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      minHeight: 120,
      textAlignVertical: 'top' as const,
      marginBottom: 20,
    },
    createModalActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    createModalButton: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
    },
    createModalButtonText: {
      fontSize: 16,
      fontWeight: '600' as const,
    },
    trendingModalContent: {
      width: '90%' as const,
      maxWidth: 400,
      maxHeight: '80%' as const,
      borderRadius: 12,
      padding: 20,
    },
    trendingModalTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      textAlign: 'center' as const,
      marginBottom: 20,
    },
    trendingItem: {
      padding: 16,
      borderRadius: 12,
      marginBottom: 8,
    },
    trendingCategory: {
      fontSize: 12,
      marginBottom: 4,
    },
    trendingName: {
      fontSize: 16,
      fontWeight: '600' as const,
      marginBottom: 4,
    },
    trendingCount: {
      fontSize: 14,
    },
    modalCloseButton: {
      paddingVertical: 12,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 16,
    },
    modalCloseText: {
      fontSize: 16,
      fontWeight: '600' as const,
    },
    momentsSection: {
      paddingVertical: 16,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    },
    momentsHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    momentsTitle: {
      fontSize: 14,
      fontWeight: '700' as const,
      letterSpacing: 1,
    },
    momentsSubtitle: {
      fontSize: 11,
      marginTop: 2,
    },
    momentsAvatars: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
    },
    addMomentButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderStyle: 'dashed' as const,
      alignItems: 'center',
      justifyContent: 'center',
    },
    momentAvatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    momentCard: {
      borderRadius: 16,
      overflow: 'hidden' as const,
      height: 400,
      position: 'relative' as const,
    },
    momentCardImage: {
      width: '100%' as const,
      height: '100%' as const,
    },
    momentCardOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: 16,
      justifyContent: 'space-between',
    },
    momentCardGradient: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: '60%' as const,
    },
    momentTopicBadge: {
      alignSelf: 'flex-start' as const,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backdropFilter: 'blur(10px)',
    },
    momentTopicText: {
      fontSize: 11,
      fontWeight: '600' as const,
      letterSpacing: 0.5,
      textTransform: 'uppercase' as const,
    },
    momentCardContent: {
      gap: 8,
    },
    momentCardTitle: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 28,
    },
    momentCardCaption: {
      fontSize: 13,
      lineHeight: 18,
    },
    momentCardUser: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginTop: 8,
    },
    momentCardUsername: {
      fontSize: 13,
      fontWeight: '500' as const,
    },
    momentCardStats: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginTop: 8,
    },
    momentCardStat: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    momentCardStatText: {
      fontSize: 12,
      fontWeight: '500' as const,
    },
    endOfFeedContainer: {
      paddingVertical: 48,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      alignItems: 'center',
      justifyContent: 'center',
    },
    endOfFeedLabel: {
      fontSize: 11,
      fontWeight: '600' as const,
      letterSpacing: 1.5,
      marginBottom: 8,
    },
    endOfFeedTitle: {
      fontSize: 24,
      fontWeight: '600' as const,
      textAlign: 'center' as const,
    },
    momentInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 16,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 24,
    },
    momentInputAvatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
    },
    momentInputText: {
      flex: 1,
      fontSize: 14,
    },
    momentInputIcon: {
      padding: 4,
    },
    trendingSection: {
      paddingVertical: 16,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    },
    trendingSectionTitle: {
      fontSize: 14,
      fontWeight: '700' as const,
      letterSpacing: 1,
      marginBottom: 16,
    },
    trendingTopicItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 12,
      borderBottomWidth: 1,
    },
    trendingTopicIcon: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    trendingTopicContent: {
      flex: 1,
    },
    trendingTopicName: {
      fontSize: 15,
      fontWeight: '600' as const,
    },
  });
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('for-you');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [showTrendingModal, setShowTrendingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'shorts'>('feed');

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise((resolve) => {
      if (typeof resolve === 'function') {
        setTimeout(resolve, 1000);
      }
    });
    setRefreshing(false);
  }, []);

  const filteredPosts = useMemo(() => {
    switch (activeFilter) {
      case 'following':
        return posts.filter(post => post.user.id !== currentUser.id);
      case 'trending':
        return posts.filter(post => (post.likes + post.reposts + post.comments) > 20);
      default:
        return posts;
    }
  }, [posts, activeFilter]);

  const handleCreatePost = () => {
    if (Platform.OS === 'web') {
      setShowCreateModal(true);
    } else {
      router.push('/create-post');
    }
  };

  const handleSubmitPost = () => {
    if (newPostContent.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        user: currentUser,
        content: newPostContent.trim(),
        timestamp: 'now',
        likes: 0,
        comments: 0,
        reposts: 0,
        bookmarks: 0,
        hashtags: [],
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setShowCreateModal(false);
    }
  };

  const handleStoryPress = (story: Story) => {
    if (story.user.id === currentUser.id) {
      router.push('/camera-preview');
    } else {
      console.log('Viewing story:', story.user.name);
    }
  };

  const handleCommentPress = (post: Post) => {
    router.push({
      pathname: '/comments',
      params: { postId: post.id }
    });
  };

  const renderStoryRing = (story: Story) => {
    const totalPosts = story.posts.length;
    if (totalPosts === 1) {
      const isViewed = story.posts[0].isViewed;
      return (
        <View
          style={[
            styles.storyRing,
            {
              borderWidth: 2,
              borderColor: isViewed
                ? isDark
                  ? 'rgba(255, 255, 255, 0.16)'
                  : 'rgba(0, 0, 0, 0.16)'
                : primary,
            },
          ]}
        />
      );
    }

    const segmentAngle = 360 / totalPosts;

    return (
      <View style={styles.storyRing}>
        {story.posts.map((post, index) => {
          const startAngle = index * segmentAngle;
          const isViewed = post.isViewed;

          const segmentColor = isViewed
            ? isDark
              ? 'rgba(255, 255, 255, 0.16)'
              : 'rgba(0, 0, 0, 0.16)'
            : primary;

          return (
            <View
              key={post.id}
              style={{
                position: 'absolute' as const,
                top: 0,
                left: 0,
                width: 64,
                height: 64,
                borderRadius: 32,
                borderWidth: 2,
                borderColor: segmentColor,
                transform: [{ rotate: `${startAngle}deg` }],
                borderTopColor: segmentColor,
                borderRightColor: 'transparent',
                borderBottomColor: 'transparent',
                borderLeftColor: 'transparent',
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderStory = ({ item }: { item: Story }) => {
    const firstPost = item.posts[0];
    const dominantColor = firstPost.dominantColor || '#000000';

    return (
      <TouchableOpacity
        style={styles.storyContainer}
        onPress={() => handleStoryPress(item)}
      >
        <View style={styles.storyImageContainer}>
          {renderStoryRing(item)}
          <View style={styles.storyImageWrapper}>
            <Image source={{ uri: firstPost.image }} style={styles.storyImage} />
            <View
              style={[
                styles.storyGradient,
                {
                  backgroundColor: 'transparent',
                },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: `${dominantColor}00`,
                }}
              />
              <View
                style={{
                  flex: 1,
                  backgroundColor: dominantColor,
                }}
              />
            </View>
            {item.user.id === currentUser.id && (
              <View style={[styles.addStoryButton, { backgroundColor: primary }]}>
                <Plus size={12} color="white" />
              </View>
            )}
          </View>
        </View>
        <Text style={[styles.storyName, { color: colors.text }]} numberOfLines={1}>
          {item.user.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onComment={() => handleCommentPress(item)}
      onBookmark={() => console.log('Bookmark', item.id)}
    />
  );

  const ListFooter = () => (
    <View style={styles.endOfFeedContainer}>
      <Text style={[styles.endOfFeedLabel, { color: colors.textSecondary }]}>EXPLORE MORE POSTS IN</Text>
      <Text style={[styles.endOfFeedTitle, { color: colors.text }]}>Current cell&apos;s Grouping&apos;s h - City</Text>
    </View>
  );

  const renderTrendingTopic = ({ item }: { item: TrendingTopic }) => (
    <TouchableOpacity
      style={[styles.trendingItem, { backgroundColor: colors.surface }]}
      onPress={() => router.push(`/search-results?query=${item.name.replace('#', '')}`)}
    >
      <Text style={[styles.trendingCategory, { color: colors.textSecondary }]}>
        {item.category}
      </Text>
      <Text style={[styles.trendingName, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.trendingCount, { color: colors.textSecondary }]}>
        {item.tweets}
      </Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ filter, title, icon }: { filter: FeedFilter; title: string; icon: React.ReactNode }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        {
          backgroundColor: activeFilter === filter ? primary : 'transparent',
          borderColor: activeFilter === filter ? primary : colors.border,
        }
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <View style={styles.filterButtonContent}>
        {icon}
        <Text style={[
          styles.filterText,
          {
            color: activeFilter === filter ? 'white' : colors.text,
            marginLeft: 8,
          }
        ]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View>
      {/* Stories Section */}
      <View style={styles.storiesSection}>
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        />
      </View>

      {/* Feed Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton
            filter="for-you"
            title="For You"
            icon={<Sparkles size={16} color={activeFilter === 'for-you' ? 'white' : colors.text} />}
          />
          <FilterButton
            filter="following"
            title="Following"
            icon={<Users size={16} color={activeFilter === 'following' ? 'white' : colors.text} />}
          />
          <FilterButton
            filter="trending"
            title="Trending"
            icon={<TrendingUp size={16} color={activeFilter === 'trending' ? 'white' : colors.text} />}
          />
        </ScrollView>
      </View>

      {/* MOMENTS Section */}
      <View style={styles.momentsSection}>
        <View style={styles.momentsHeader}>
          <View>
            <Text style={[styles.momentsTitle, { color: colors.text }]}>MOMENTS</Text>
            <Text style={[styles.momentsSubtitle, { color: colors.textSecondary }]}>Search for Storys filtered unique elements count</Text>
          </View>
        </View>

        <View style={styles.momentsAvatars}>
          <TouchableOpacity 
            style={[styles.addMomentButton, { borderColor: colors.border }]}
            onPress={() => router.push('/camera-preview')}
          >
            <Plus size={24} color={colors.textSecondary} />
            <Text style={[{ fontSize: 11, marginTop: 4, color: colors.textSecondary }]}>Add</Text>
          </TouchableOpacity>
          {stories.slice(0, 2).map((story) => (
            <TouchableOpacity key={story.id} onPress={() => handleStoryPress(story)}>
              <Image source={{ uri: story.user.avatar }} style={styles.momentAvatar} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.momentCard}
          activeOpacity={0.9}
          onPress={() => console.log('View moment')}
        >
          <Image 
            source={{ uri: posts[0]?.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4' }} 
            style={styles.momentCardImage}
          />
          <View style={styles.momentCardGradient}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }} />
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }} />
          </View>
          <View style={styles.momentCardOverlay}>
            <View style={styles.momentTopicBadge}>
              <Text style={[styles.momentTopicText, { color: 'white' }]}>TOPIC&apos;S DISPLAY</Text>
            </View>
            
            <View style={styles.momentCardContent}>
              <Text style={[styles.momentCardTitle, { color: 'white' }]}>Parent group&apos;s Feed Post&apos;s p - post-title</Text>
              <Text style={[styles.momentCardCaption, { color: 'rgba(255, 255, 255, 0.9)' }]} numberOfLines={2}>
                Parent group&apos;s Feed Post&apos;s p - caption number of characters &gt; 240 formatted as text
              </Text>
              <View style={styles.momentCardUser}>
                <Text style={[styles.momentCardUsername, { color: 'rgba(255, 255, 255, 0.8)' }]}>@{posts[0]?.user.username || 'username'}</Text>
              </View>
              <View style={styles.momentCardStats}>
                <View style={styles.momentCardStat}>
                  <ArrowUp size={14} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={[styles.momentCardStatText, { color: 'rgba(255, 255, 255, 0.8)' }]}>{posts[0]?.likes || 0}</Text>
                </View>
                <View style={styles.momentCardStat}>
                  <MessageSquare size={14} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={[styles.momentCardStatText, { color: 'rgba(255, 255, 255, 0.8)' }]}>{posts[0]?.comments || 0}</Text>
                </View>
                <View style={styles.momentCardStat}>
                  <Repeat size={14} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={[styles.momentCardStatText, { color: 'rgba(255, 255, 255, 0.8)' }]}>{posts[0]?.reposts || 0}</Text>
                </View>
                <View style={styles.momentCardStat}>
                  <Bookmark size={14} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={[styles.momentCardStatText, { color: 'rgba(255, 255, 255, 0.8)' }]}>Saved Collections count</Text>
                </View>
              </View>
              <Text style={[{ fontSize: 11, color: 'rgba(255, 255, 255, 0.6)', marginTop: 4 }]}>Parent group&apos;s Feed Post&apos;s t - Topic&apos;s Display uppercase</Text>
              <Text style={[{ fontSize: 10, color: 'rgba(255, 255, 255, 0.5)' }]}>Parent group&apos;s Feed Post&apos;s Creation Date formatted as 05/10/2025 at 14:00pm</Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={[styles.momentInputContainer, { backgroundColor: colors.surface }]}>
          <Image source={{ uri: currentUser.avatar }} style={styles.momentInputAvatar} />
          <Text style={[styles.momentInputText, { color: colors.textSecondary }]}>Tell everyone what&apos;s new...</Text>
          <TouchableOpacity style={styles.momentInputIcon}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3342/3342137.png' }} style={{ width: 20, height: 20, tintColor: colors.textSecondary }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TRENDING TOPICS Section */}
      <View style={styles.trendingSection}>
        <Text style={[styles.trendingSectionTitle, { color: colors.text }]}>TRENDING TOPICS</Text>
        
        {trendingTopics.slice(0, 3).map((topic, index) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.trendingTopicItem, { borderBottomColor: colors.border }]}
            onPress={() => router.push(`/search-results?query=${topic.name.replace('#', '')}`)}
          >
            <View style={[styles.trendingTopicIcon, { backgroundColor: colors.surface }]}>
              {index === 0 ? (
                <Hash size={16} color={primary} />
              ) : (
                <TrendingUp size={16} color={primary} />
              )}
            </View>
            <View style={styles.trendingTopicContent}>
              <Text style={[styles.trendingTopicName, { color: colors.text }]}>{topic.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setActiveTab('feed')}>
            <Text style={[
              styles.headerText,
              { color: colors.text },
              activeTab === 'feed' ? styles.headerTextActive : styles.headerTextInactive
            ]}>Feed</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('shorts')}>
            <Text style={[
              styles.headerText,
              { color: colors.text },
              activeTab === 'shorts' ? styles.headerTextActive : styles.headerTextInactive
            ]}>Shorts</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/(search)/search')}
          >
            <Search size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/(notifications)/notifications')}
          >
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/(messages)/messages')}
          >
            <MessageCircle size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: primary }]}
        onPress={handleCreatePost}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>

      {/* Create Post Modal (Web) */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.createModalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.createModalTitle, { color: colors.text }]}>Create Post</Text>
            
            <TextInput
              style={[
                styles.createPostInput,
                {
                  color: colors.text,
                }
              ]}
              placeholder="What's happening?"
              placeholderTextColor={colors.textSecondary}
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              maxLength={280}
              autoFocus
            />
            
            <View style={styles.createModalActions}>
              <TouchableOpacity
                style={[styles.createModalButton, { backgroundColor: colors.surface }]}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={[styles.createModalButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.createModalButton, { backgroundColor: primary }]}
                onPress={handleSubmitPost}
                disabled={!newPostContent.trim()}
              >
                <Text style={[styles.createModalButtonText, { color: 'white' }]}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Trending Modal */}
      <Modal
        visible={showTrendingModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTrendingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.trendingModalContent, { backgroundColor: colors.background }]}>
            <Text style={[styles.trendingModalTitle, { color: colors.text }]}>Trending Topics</Text>
            
            <FlatList
              data={trendingTopics}
              renderItem={renderTrendingTopic}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
            
            <TouchableOpacity
              style={[styles.modalCloseButton, { backgroundColor: colors.surface }]}
              onPress={() => setShowTrendingModal(false)}
            >
              <Text style={[styles.modalCloseText, { color: colors.text }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}