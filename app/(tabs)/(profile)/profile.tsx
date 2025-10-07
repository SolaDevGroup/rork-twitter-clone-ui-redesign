import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { MapPin, Calendar, LogOut, Settings, MoreHorizontal, ChevronDown } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { currentUser, posts } from '@/mocks/data';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const { logout } = useAuth();
  const { colors, primary, error } = useTheme();
  const [activeTab, setActiveTab] = useState<'posts' | 'retweets' | 'mentions'>('posts');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'engagement'>('recent');
  const [showImagesOnly, setShowImagesOnly] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const insets = useSafeAreaInsets();
  
  const userPosts = posts.filter(post => post.user.id === currentUser.id);
  const userRetweets = posts.filter(post => post.type === 'repost' && post.user.id === currentUser.id);
  const userMentions = posts.filter(post => post.mentions?.some(mention => mention.id === currentUser.id));

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

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const handleEditProfile = () => {
    router.push('/edit-profile');
  };
  
  const handleSettings = () => {
    router.push('/settings');
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
    editButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.xl,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      backgroundColor: colors.surface,
    },
    editButtonText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.semiBold,
      color: colors.text,
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
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: spacing.md,
      gap: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    tab: {
      paddingHorizontal: spacing.lg,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activeTab: {
      backgroundColor: colors.text,
      borderColor: colors.text,
    },
    tabText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    activeTabText: {
      color: colors.background,
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
    sortDropdownButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    sortDropdownText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
      color: colors.text,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    dropdownContainer: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: borderRadius.xl,
      borderTopRightRadius: borderRadius.xl,
      paddingBottom: insets.bottom,
    },
    dropdownItem: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dropdownItemText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.medium,
      color: colors.text,
    },
    activeDropdownItem: {
      backgroundColor: colors.inputBackground,
    },
    activeDropdownItemText: {
      color: primary,
    },
    imageFilter: {
      paddingHorizontal: spacing.lg,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeImageFilter: {
      backgroundColor: colors.text,
      borderColor: colors.text,
    },
    imageFilterText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    activeImageFilterText: {
      color: colors.background,
    },
    postsSection: {
      flex: 1,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg,
      marginVertical: spacing.xl,
      gap: spacing.md,
    },
    logoutText: {
      fontSize: fontSizes.md,
      fontFamily: fonts.semiBold,
      color: error,
    },
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: currentUser.coverImage }} style={styles.coverImage} />
          <View style={styles.profileHeader}>
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
                <Settings size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <MoreHorizontal size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Text style={styles.editButtonText}>Edit profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{currentUser.name}</Text>
            {currentUser.isVerified && <Text style={styles.verified}>✓</Text>}
          </View>
          <Text style={styles.username}>@{currentUser.username}</Text>
          <Text style={styles.bio}>{currentUser.bio}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>{currentUser.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.textSecondary} />
              <Text style={styles.detailText}>Joined {currentUser.joinedDate}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{currentUser.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.activeTabText]}>Posts {userPosts.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'retweets' && styles.activeTab]}
            onPress={() => setActiveTab('retweets')}
          >
            <Text style={[styles.tabText, activeTab === 'retweets' && styles.activeTabText]}>Retweets {userRetweets.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'mentions' && styles.activeTab]}
            onPress={() => setActiveTab('mentions')}
          >
            <Text style={[styles.tabText, activeTab === 'mentions' && styles.activeTabText]}>Mentions {userMentions.length}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={styles.sortDropdownButton}
            onPress={() => setShowSortDropdown(true)}
          >
            <Text style={styles.sortDropdownText}>
              {sortBy === 'recent' ? 'Recent' : sortBy === 'oldest' ? 'Oldest' : 'Top'}
            </Text>
            <ChevronDown size={16} color={colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.imageFilter, showImagesOnly && styles.activeImageFilter]}
            onPress={() => setShowImagesOnly(!showImagesOnly)}
          >
            <Text style={[styles.imageFilterText, showImagesOnly && styles.activeImageFilterText]}>Images only</Text>
          </TouchableOpacity>
        </View>
        
        <Modal
          visible={showSortDropdown}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSortDropdown(false)}
        >
          <TouchableOpacity 
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowSortDropdown(false)}
          >
            <View style={styles.dropdownContainer}>
              <TouchableOpacity 
                style={[styles.dropdownItem, sortBy === 'recent' && styles.activeDropdownItem]}
                onPress={() => {
                  setSortBy('recent');
                  setShowSortDropdown(false);
                }}
              >
                <Text style={[styles.dropdownItemText, sortBy === 'recent' && styles.activeDropdownItemText]}>Recent</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.dropdownItem, sortBy === 'oldest' && styles.activeDropdownItem]}
                onPress={() => {
                  setSortBy('oldest');
                  setShowSortDropdown(false);
                }}
              >
                <Text style={[styles.dropdownItemText, sortBy === 'oldest' && styles.activeDropdownItemText]}>Oldest</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.dropdownItem, sortBy === 'engagement' && styles.activeDropdownItem]}
                onPress={() => {
                  setSortBy('engagement');
                  setShowSortDropdown(false);
                }}
              >
                <Text style={[styles.dropdownItemText, sortBy === 'engagement' && styles.activeDropdownItemText]}>Top</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        
        <View style={styles.postsSection}>
          {getFilteredPosts().map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color={error} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}