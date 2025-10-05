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
import { posts as mockPosts, trendingTopics, currentUser } from '@/mocks/data';
import { Post, TrendingTopic } from '@/types';
import { useTheme } from '@/contexts/ThemeContext';
import { Plus, Settings, Camera, Sparkles, TrendingUp, Users, Hash } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';

type FeedFilter = 'for-you' | 'following' | 'trending';

interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  image: string;
  isViewed: boolean;
}

const stories: Story[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Your Story',
      avatar: currentUser.avatar,
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    isViewed: false,
  },
  {
    id: '2',
    user: {
      id: '2',
      name: 'Codesistency',
      avatar: 'https://ui-avatars.com/api/?name=Codesistency&background=0891b2&color=fff&size=200',
    },
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400',
    isViewed: true,
  },
  {
    id: '3',
    user: {
      id: '3',
      name: 'James Doe',
      avatar: 'https://ui-avatars.com/api/?name=James+Doe&background=6366f1&color=fff&size=200',
    },
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400',
    isViewed: false,
  },
  {
    id: '4',
    user: {
      id: '4',
      name: 'Coffee Lover',
      avatar: 'https://ui-avatars.com/api/?name=Coffee+Lover&background=8b5cf6&color=fff&size=200',
    },
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
    isViewed: false,
  },
];

export default function HomeScreen() {
  const { colors, primary } = useTheme();
  const insets = useSafeAreaInsets();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('for-you');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [showTrendingModal, setShowTrendingModal] = useState(false);

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

  const renderStory = ({ item }: { item: Story }) => (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={() => handleStoryPress(item)}
    >
      <View style={[
        styles.storyImageContainer,
        { borderColor: item.isViewed ? colors.border : primary }
      ]}>
        <Image source={{ uri: item.image }} style={styles.storyImage} />
        {item.user.id === currentUser.id && (
          <View style={[styles.addStoryButton, { backgroundColor: primary }]}>
            <Plus size={12} color="white" />
          </View>
        )}
      </View>
      <Text style={[styles.storyName, { color: colors.text }]} numberOfLines={1}>
        {item.user.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onComment={() => handleCommentPress(item)}
      onBookmark={() => console.log('Bookmark', item.id)}
    />
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
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Settings size={24} color={colors.text} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: colors.text }]}>Home</Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowTrendingModal(true)}
          >
            <Hash size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push('/camera-preview')}
          >
            <Camera size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
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
                  backgroundColor: colors.inputBackground,
                  color: colors.text,
                  borderColor: colors.border,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    padding: 2,
    position: 'relative',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  addStoryButton: {
    position: 'absolute',
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
    textAlign: 'center',
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
    fontWeight: '500',
  },
  feedContainer: {
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
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
    width: '90%',
    maxWidth: 400,
    borderRadius: 12,
    padding: 20,
  },
  createModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  createPostInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
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
    fontWeight: '600',
  },
  trendingModalContent: {
    width: '90%',
    maxWidth: 400,
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
  },
  trendingModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
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
    fontWeight: '600',
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
    fontWeight: '600',
  },
});