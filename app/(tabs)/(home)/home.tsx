import React, { useState, useCallback, useMemo, useRef } from 'react';
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
  PanResponder,
  Animated,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { PostCard } from '@/components/PostCard';
import { posts as mockPosts, trendingTopics, currentUser, stories as mockStories } from '@/mocks/data';
import { Post, TrendingTopic, Story } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Search, MessageCircle, Camera, BarChart2, Mic, ChevronDown, PlayCircle, X, Hash, TrendingUp } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';

type FeedFilter = 'Following' | 'For You' | 'Trending';
type TopicType = 'All' | 'Technology' | 'Politics' | 'Sports' | 'Music';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const { colors, primary, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [stories] = useState<Story[]>(mockStories);
  const swipeX = useRef(new Animated.Value(0)).current;
  const [isSwipingToCamera, setIsSwipingToCamera] = useState(false);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('Following');
  const [activeTopic, setActiveTopic] = useState<TopicType>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [showTrendingModal, setShowTrendingModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'feed' | 'shorts'>('feed');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    headerText: {
      fontSize: 28,
      fontWeight: '600' as const,
    },
    headerTextActive: {
      color: colors.text,
    },
    headerTextInactive: {
      color: colors.textSecondary,
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
    notificationBadge: {
      position: 'absolute' as const,
      top: 8,
      right: 8,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FF385C',
    },
    topicsRow: {
      marginBottom: 12,
    },
    topicsRowContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    topicChip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      backgroundColor: colors.surface,
    },
    topicChipActive: {
      backgroundColor: colors.text,
    },
    topicChipText: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
    },
    topicChipTextActive: {
      color: colors.background,
    },
    filterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    filterDropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    filterText: {
      fontSize: 16,
      fontWeight: '600' as const,
      color: colors.text,
    },
    filterActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    postInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 16,
      backgroundColor: colors.surface,
      marginHorizontal: SCREEN_HORIZONTAL_PADDING,
      borderRadius: 24,
      marginTop: 16,
    },
    postInputAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    postInputText: {
      flex: 1,
      fontSize: 14,
      color: colors.textSecondary,
    },
    postInputActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
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
      fontSize: 11,
      fontWeight: '700' as const,
      letterSpacing: 1,
      color: colors.textSecondary,
    },
    momentsCount: {
      fontSize: 18,
      fontWeight: '700' as const,
      color: colors.text,
    },
    playAllButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    playAllText: {
      fontSize: 13,
      fontWeight: '600' as const,
      color: colors.text,
    },
    storiesRow: {
      marginBottom: 16,
    },
    storiesRowContent: {
      flexDirection: 'row',
    },
    storyItem: {
      marginRight: 12,
      alignItems: 'center',
    },
    addStoryContainer: {
      width: 100,
      height: 150,
      borderRadius: 12,
      borderWidth: 2,
      borderStyle: 'dashed' as const,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    storyImageContainer: {
      width: 100,
      height: 150,
      borderRadius: 12,
      overflow: 'hidden' as const,
      position: 'relative' as const,
    },
    storyImage: {
      width: '100%' as const,
      height: '100%' as const,
    },
    storyGradient: {
      position: 'absolute' as const,
      bottom: 0,
      left: 0,
      right: 0,
      height: '50%' as const,
      padding: 8,
      justifyContent: 'flex-end',
    },
    storyName: {
      fontSize: 12,
      fontWeight: '700' as const,
      color: 'white',
    },
    storySurname: {
      fontSize: 12,
      fontWeight: '700' as const,
      color: 'white',
    },
    storyBorder: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: 12,
      borderWidth: 3,
    },
    investmentCard: {
      marginHorizontal: SCREEN_HORIZONTAL_PADDING,
      marginBottom: 16,
      borderRadius: 16,
      padding: 20,
      position: 'relative' as const,
      overflow: 'hidden' as const,
    },
    investmentBg: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#8B5CF6',
    },
    investmentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    investmentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    investmentTitleText: {
      fontSize: 11,
      fontWeight: '700' as const,
      letterSpacing: 1,
      color: 'white',
    },
    closeButton: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    investmentContent: {
      fontSize: 13,
      lineHeight: 20,
      color: 'white',
      marginBottom: 16,
    },
    investmentROI: {
      fontSize: 32,
      fontWeight: '700' as const,
      color: 'white',
      marginBottom: 8,
    },
    investmentSignature: {
      fontSize: 24,
      fontStyle: 'italic' as const,
      color: 'white',
      textAlign: 'right' as const,
    },
    investmentThankYou: {
      fontSize: 13,
      fontWeight: '600' as const,
      color: 'white',
    },
    trendingSection: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 16,
    },
    trendingSectionTitle: {
      fontSize: 11,
      fontWeight: '700' as const,
      letterSpacing: 1,
      color: colors.textSecondary,
      marginBottom: 12,
    },
    trendingTopicsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    trendingTopicPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 1000,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
    },
    trendingTopicName: {
      fontSize: 13,
      fontWeight: '500' as const,
      color: colors.text,
    },
    feedContainer: {
      paddingBottom: 100,
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
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dx > 20 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 2;
      },
      onPanResponderGrant: () => {
        setIsSwipingToCamera(true);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          swipeX.setValue(Math.min(gestureState.dx, SCREEN_WIDTH));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const threshold = SCREEN_WIDTH * 0.4;
        const velocity = gestureState.vx;
        
        if (gestureState.dx > threshold || velocity > 0.5) {
          Animated.timing(swipeX, {
            toValue: SCREEN_WIDTH,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            router.push('/camera-capture');
            setTimeout(() => {
              swipeX.setValue(0);
              setIsSwipingToCamera(false);
            }, 100);
          });
        } else {
          Animated.spring(swipeX, {
            toValue: 0,
            tension: 100,
            friction: 10,
            useNativeDriver: true,
          }).start(() => {
            setIsSwipingToCamera(false);
          });
        }
      },
    })
  ).current;

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
    return posts;
  }, [posts]);

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

  const handleCommentPress = (post: Post) => {
    router.push({
      pathname: '/comments',
      params: { postId: post.id }
    });
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onComment={() => handleCommentPress(item)}
      onBookmark={() => console.log('Bookmark', item.id)}
    />
  );

  const topics: TopicType[] = ['All', 'Technology', 'Politics', 'Sports', 'Music'];

  const ListHeader = () => (
    <View>
      <TouchableOpacity 
        style={styles.postInputContainer}
        onPress={handleCreatePost}
        activeOpacity={0.7}
      >
        <Image source={{ uri: currentUser.avatar }} style={styles.postInputAvatar} />
        <Text style={styles.postInputText}>Hey! What&apos;s new...?</Text>
        <View style={styles.postInputActions}>
          <TouchableOpacity onPress={(e) => { e.stopPropagation(); router.push('/camera-capture'); }}>
            <Camera size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => { e.stopPropagation(); console.log('Poll'); }}>
            <BarChart2 size={20} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => { e.stopPropagation(); console.log('Audio'); }}>
            <Mic size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.momentsSection}>
        <View style={styles.momentsHeader}>
          <View>
            <Text style={styles.momentsTitle}>MOMENTS <Text style={styles.momentsCount}>14</Text></Text>
          </View>
          <TouchableOpacity style={styles.playAllButton}>
            <PlayCircle size={16} color={colors.text} />
            <Text style={styles.playAllText}>PLAY ALL</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRow} contentContainerStyle={styles.storiesRowContent}>
          <TouchableOpacity style={styles.storyItem} onPress={() => router.push('/camera-capture')}>
            <View style={styles.addStoryContainer}>
              <Camera size={32} color={colors.textSecondary} />
            </View>
          </TouchableOpacity>

          {stories.slice(1, 4).map((story, index) => {
            const firstPost = story.posts[0];
            const borderColors = ['#EF4444', '#3B82F6', '#EF4444'];
            return (
              <TouchableOpacity key={story.id} style={styles.storyItem}>
                <View style={styles.storyImageContainer}>
                  <Image source={{ uri: firstPost.image }} style={styles.storyImage} />
                  <View style={[styles.storyGradient, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]}>
                    <Text style={styles.storyName}>Firstname</Text>
                    <Text style={styles.storySurname}>Surname</Text>
                  </View>
                  <View style={[styles.storyBorder, { borderColor: borderColors[index] }]} />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.investmentCard}>
        <View style={styles.investmentBg} />
        <View style={styles.investmentHeader}>
          <View style={styles.investmentTitle}>
            <TrendingUp size={16} color="white" />
            <Text style={styles.investmentTitleText}>INVEST IN THE FUTURE</Text>
          </View>
          <TouchableOpacity style={styles.closeButton}>
            <X size={18} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.investmentContent}>
          WE ARE A NON-PROFIT COMPANY AIMING TO PROVIDE BETTER SERVICES AND PRODUCTS TO HUMANS ACROSS THE WORLD. YOU CAN TAKE PART OF THIS JOURNEY AND LEVERAGE OUR SHARED ASCENSION.
        </Text>
        <Text style={styles.investmentROI}>Up to 60% ROI.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={styles.investmentThankYou}>THANK YOU!</Text>
          <Text style={styles.investmentSignature}>Viktor Sola</Text>
        </View>
      </View>

      <View style={styles.trendingSection}>
        <Text style={styles.trendingSectionTitle}>TRENDING TOPICS</Text>
        
        <View style={styles.trendingTopicsGrid}>
          {['#Crypto', '#Italy', '#Europe', '#Crypto', '#Crypto', '#Crypto', 'Basketball', 'Aaron Ramsey', 'Basketball', 'Basketball', 'Basketball'].map((topic, index) => (
            <TouchableOpacity
              key={`topic-${index}`}
              style={styles.trendingTopicPill}
              onPress={() => router.push(`/search-results?query=${topic.replace('#', '')}`)}
            >
              {topic.startsWith('#') ? (
                <Hash size={14} color={colors.textSecondary} />
              ) : (
                <TrendingUp size={14} color={colors.textSecondary} />
              )}
              <Text style={styles.trendingTopicName}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]} {...panResponder.panHandlers}>
      {isSwipingToCamera && (
        <Animated.View
          style={{
            position: 'absolute' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            opacity: swipeX.interpolate({
              inputRange: [0, SCREEN_WIDTH],
              outputRange: [0, 1],
            }),
            zIndex: 1,
          }}
          pointerEvents="none"
        />
      )}

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => setActiveTab('feed')}>
              <Text style={[
                styles.headerText,
                activeTab === 'feed' ? styles.headerTextActive : styles.headerTextInactive
              ]}>Feed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/(shorts)/shorts')}>
              <Text style={[
                styles.headerText,
                activeTab === 'shorts' ? styles.headerTextActive : styles.headerTextInactive
              ]}>shorts</Text>
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
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/(tabs)/(messages)/messages')}
            >
              <MessageCircle size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topicsRow} contentContainerStyle={styles.topicsRowContent}>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.topicChip,
                activeTopic === topic && styles.topicChipActive
              ]}
              onPress={() => setActiveTopic(topic)}
            >
              <Text style={[
                styles.topicChipText,
                activeTopic === topic && styles.topicChipTextActive
              ]}>
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.filterDropdown}
            onPress={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <Text style={styles.filterText}>{activeFilter}</Text>
            <ChevronDown size={20} color={colors.text} />
          </TouchableOpacity>
          <View style={styles.filterActions}>
            <TouchableOpacity>
              <MessageCircle size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity>
              <BarChart2 size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        onRefresh={onRefresh}
        refreshing={refreshing}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.feedContainer}
      />

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
    </View>
  );
}
