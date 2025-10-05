import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MapPin, Calendar, MoreHorizontal } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { users, posts } from '@/mocks/data';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function UserProfileScreen() {
  const { profileId } = useLocalSearchParams();
  const { colors, primary } = useTheme();
  const [activeTab, setActiveTab] = useState<'posts' | 'retweets' | 'mentions'>('posts');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'engagement'>('recent');
  const [showImagesOnly, setShowImagesOnly] = useState(false);
  const insets = useSafeAreaInsets();
  
  const user = users.find(u => u.id === profileId);

  if (!user) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>User not found</Text>
      </View>
    );
  }

  const userPosts = posts.filter(post => post.user.id === profileId);
  const userRetweets = posts.filter(post => post.type === 'repost' && post.user.id === profileId);
  const userMentions = posts.filter(post => post.mentions?.some(mention => mention.id === profileId));

  const getFilteredPosts = () => {
    let filteredPosts = [];
    
    switch (activeTab) {
      case 'posts':
        filteredPosts = userPosts;
        break;
      case 'retweets':
        filteredPosts = userRetweets;
        break;
      case 'mentions':
        filteredPosts = userMentions;
        break;
    }
    
    if (showImagesOnly) {
      filteredPosts = filteredPosts.filter(post => post.image);
    }
    
    switch (sortBy) {
      case 'oldest':
        return [...filteredPosts].reverse();
      case 'engagement':
        return [...filteredPosts].sort((a, b) => (b.likes + b.comments + b.reposts) - (a.likes + a.comments + a.reposts));
      default:
        return filteredPosts;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      position: 'relative',
    },
    coverImage: {
      width: '100%',
      height: 150,
    },
    profileHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      marginTop: -30,
    },
    headerButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: colors.background,
    },
    followButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.xl,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: colors.text,
    },
    followButtonText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.semiBold,
      color: colors.background,
    },
    profileInfo: {
      padding: SCREEN_HORIZONTAL_PADDING,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      fontSize: fontSizes.xl,
      fontFamily: fonts.semiBold,
      color: colors.text,
      marginRight: spacing.xs,
    },
    verified: {
      color: primary,
      fontSize: fontSizes.lg,
    },
    username: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginTop: 2,
    },
    bio: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.text,
      marginTop: spacing.lg,
    },
    details: {
      flexDirection: 'row',
      marginTop: spacing.lg,
      gap: spacing.lg,
    },
    detailItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.xs,
    },
    detailText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
    },
    stats: {
      flexDirection: 'row',
      marginTop: spacing.lg,
      gap: spacing.xl,
    },
    statItem: {
      flexDirection: 'row',
      gap: spacing.xs,
    },
    statNumber: {
      fontSize: fontSizes.base,
      fontFamily: fonts.semiBold,
      color: colors.text,
    },
    statLabel: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
    },
    tabsContainer: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.lg,
      borderBottomWidth: 2,
      borderBottomColor: 'transparent',
    },
    activeTab: {
      borderBottomColor: primary,
    },
    tabText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.text,
    },
    tabCount: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sortButtons: {
      flexDirection: 'row',
      gap: spacing.md,
    },
    sortButton: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.xl,
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeSortButton: {
      backgroundColor: primary,
      borderColor: primary,
    },
    sortButtonText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    activeSortButtonText: {
      color: '#FFFFFF',
    },
    imageFilter: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: borderRadius.xl,
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeImageFilter: {
      backgroundColor: primary,
      borderColor: primary,
    },
    imageFilterText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    activeImageFilterText: {
      color: '#FFFFFF',
    },
    postsSection: {
      flex: 1,
    },
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Stack.Screen 
        options={{ 
          title: user.name,
          headerShown: true,
        }} 
      />
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ uri: user.coverImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800' }} 
            style={styles.coverImage} 
          />
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton}>
                <MoreHorizontal size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {user.isVerified && <Text style={styles.verified}>✓</Text>}
          </View>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>{user.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Joined {user.joinedDate}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Posts</Text>
            <Text style={styles.tabCount}>{userPosts.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'retweets' && styles.activeTab]}
            onPress={() => setActiveTab('retweets')}
          >
            <Text style={[styles.tabText, activeTab === 'retweets' && styles.activeTabText]}>Retweets</Text>
            <Text style={styles.tabCount}>{userRetweets.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'mentions' && styles.activeTab]}
            onPress={() => setActiveTab('mentions')}
          >
            <Text style={[styles.tabText, activeTab === 'mentions' && styles.activeTabText]}>Mentions</Text>
            <Text style={styles.tabCount}>{userMentions.length}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterContainer}>
          <View style={styles.sortButtons}>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'recent' && styles.activeSortButton]}
              onPress={() => setSortBy('recent')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'recent' && styles.activeSortButtonText]}>Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'oldest' && styles.activeSortButton]}
              onPress={() => setSortBy('oldest')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'oldest' && styles.activeSortButtonText]}>Oldest</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.sortButton, sortBy === 'engagement' && styles.activeSortButton]}
              onPress={() => setSortBy('engagement')}
            >
              <Text style={[styles.sortButtonText, sortBy === 'engagement' && styles.activeSortButtonText]}>Top</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.imageFilter, showImagesOnly && styles.activeImageFilter]}
            onPress={() => setShowImagesOnly(!showImagesOnly)}
          >
            <Text style={[styles.imageFilterText, showImagesOnly && styles.activeImageFilterText]}>Images only</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.postsSection}>
          {getFilteredPosts().map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
