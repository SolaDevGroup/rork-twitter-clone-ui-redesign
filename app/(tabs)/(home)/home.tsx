import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Camera, Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Plus } from 'lucide-react-native';
import { currentUser } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fonts, fontSizes, spacing } from '@/constants/fonts';

const stories = [
  {
    id: 'your-story',
    user: currentUser,
    isYourStory: true,
    hasNewStory: false,
  },
  {
    id: '1',
    user: {
      id: '2',
      name: 'Viktor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    hasNewStory: true,
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    hasNewStory: true,
  },
  {
    id: '3',
    user: {
      id: '4',
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    hasNewStory: true,
  },
  {
    id: '4',
    user: {
      id: '5',
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    hasNewStory: false,
  },
];

const instagramPosts = [
  {
    id: '1',
    user: {
      name: 'viktor_music',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop',
    caption: 'New track dropping soon! 🎵 Been working on this for months and finally ready to share it with you all. What genre should I explore next?',
    likes: 1247,
    timestamp: '2 hours ago',
    location: 'Nashville, TN',
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    user: {
      name: 'sarah_designs',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isVerified: false,
    },
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop',
    caption: 'Morning coffee and design inspiration ☕️ Working on a new brand identity project today. Love how the colors are coming together!',
    likes: 892,
    timestamp: '4 hours ago',
    location: 'San Francisco, CA',
    isLiked: true,
    isSaved: true,
  },
  {
    id: '3',
    user: {
      name: 'alex_travels',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: false,
    },
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop',
    caption: 'Sunset views from the mountains 🏔️ Nothing beats this feeling of being on top of the world. Nature therapy at its finest.',
    likes: 2156,
    timestamp: '6 hours ago',
    location: 'Rocky Mountains, CO',
    isLiked: false,
    isSaved: false,
  },
];

export default function Home() {
  const insets = useSafeAreaInsets();
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set(['2']));
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set(['2']));

  const toggleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (newLikedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
  };

  const toggleSave = (postId: string) => {
    const newSavedPosts = new Set(savedPosts);
    if (newSavedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    setSavedPosts(newSavedPosts);
  };

  const renderStoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.storyItem}>
      <View style={[styles.storyImageContainer, item.hasNewStory && styles.storyImageContainerNew]}>
        <Image source={{ uri: item.user.avatar }} style={styles.storyImage} />
        {item.isYourStory && (
          <View style={styles.addStoryButton}>
            <Plus size={12} color={colors.white} />
          </View>
        )}
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {item.isYourStory ? 'Your story' : item.user.name}
      </Text>
    </TouchableOpacity>
  );

  const renderPostItem = ({ item }: { item: any }) => {
    const isLiked = likedPosts.has(item.id);
    const isSaved = savedPosts.has(item.id);
    
    return (
      <View style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.postUserInfo}>
            <Image source={{ uri: item.user.avatar }} style={styles.postAvatar} />
            <View style={styles.postUserDetails}>
              <View style={styles.usernameRow}>
                <Text style={styles.postUsername}>{item.user.name}</Text>
                {item.user.isVerified && (
                  <View style={styles.verifiedBadge}>
                    <Text style={styles.verifiedText}>✓</Text>
                  </View>
                )}
              </View>
              {item.location && (
                <Text style={styles.postLocation}>{item.location}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <MoreHorizontal size={20} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Post Image */}
        <Image source={{ uri: item.image }} style={styles.postImage} />

        {/* Post Actions */}
        <View style={styles.postActions}>
          <View style={styles.leftActions}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => toggleLike(item.id)}
            >
              <Heart 
                size={24} 
                color={isLiked ? colors.red : colors.white} 
                fill={isLiked ? colors.red : 'transparent'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <MessageCircle size={24} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Send size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => toggleSave(item.id)}
          >
            <Bookmark 
              size={24} 
              color={colors.white} 
              fill={isSaved ? colors.white : 'transparent'}
            />
          </TouchableOpacity>
        </View>

        {/* Post Info */}
        <View style={styles.postInfo}>
          <Text style={styles.likesCount}>
            {item.likes.toLocaleString()} likes
          </Text>
          <View style={styles.captionContainer}>
            <Text style={styles.captionUsername}>{item.user.name}</Text>
            <Text style={styles.captionText}> {item.caption}</Text>
          </View>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <TouchableOpacity onPress={() => router.push('/camera-preview')}>
          <Camera size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>BandMate</Text>
        <TouchableOpacity>
          <Send size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={instagramPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPostItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.storiesContainer}>
            <FlatList
              data={stories}
              keyExtractor={(item) => item.id}
              renderItem={renderStoryItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContent}
            />
          </View>
        }
        contentContainerStyle={styles.feedContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    backgroundColor: colors.black,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fonts.bold,
    color: colors.white,
    letterSpacing: -0.5,
  },
  storiesContainer: {
    backgroundColor: colors.black,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  storiesContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
  },
  storyItem: {
    alignItems: 'center',
    width: 70,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2,
    marginBottom: spacing.xs,
    position: 'relative',
  },
  storyImageContainerNew: {
    backgroundColor: colors.primary,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.black,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.black,
  },
  storyName: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.regular,
    color: colors.white,
    textAlign: 'center',
  },
  feedContent: {
    paddingBottom: spacing.xxxl,
  },
  postContainer: {
    backgroundColor: colors.black,
    marginBottom: spacing.lg,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  postAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: spacing.lg,
  },
  postUserDetails: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  postUsername: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  verifiedBadge: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 8,
    color: colors.white,
    fontFamily: fonts.bold,
  },
  postLocation: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.regular,
    color: colors.mediumGray,
    marginTop: 2,
  },
  moreButton: {
    padding: spacing.xs,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  actionButton: {
    padding: spacing.xs,
  },
  postInfo: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.xs,
  },
  likesCount: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  captionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  captionUsername: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  captionText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.white,
    flex: 1,
  },
  timestamp: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.regular,
    color: colors.mediumGray,
    marginTop: spacing.xs,
  },
});