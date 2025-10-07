import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MapPin, Calendar, MoreHorizontal, Heart, X, Info } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { users, posts, matchProfiles } from '@/mocks/data';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors as colorConstants } from '@/constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function UserProfileScreen() {
  const { profileId } = useLocalSearchParams();
  const { colors, primary } = useTheme();
  const [activeTab, setActiveTab] = useState<'posts' | 'retweets' | 'mentions'>('posts');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'engagement'>('recent');
  const [showImagesOnly, setShowImagesOnly] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
  const user = users.find(u => u.id === profileId);
  const matchProfile = matchProfiles.find(p => p.id === profileId);

  if (!user && !matchProfile) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.text }}>Profile not found</Text>
      </View>
    );
  }

  if (matchProfile) {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: colors.background,
      },
      imageContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * 1.3,
        position: 'relative',
      },
      profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      imageIndicators: {
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        flexDirection: 'row',
        gap: 4,
        zIndex: 10,
      },
      indicator: {
        flex: 1,
        height: 3,
        borderRadius: 2,
      },
      imageTouchLeft: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        zIndex: 5,
      },
      imageTouchRight: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        zIndex: 5,
      },
      profileInfo: {
        padding: SCREEN_HORIZONTAL_PADDING,
      },
      nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
      },
      name: {
        fontSize: 28,
        fontFamily: fonts.semiBold,
        color: colors.text,
      },
      age: {
        fontSize: 28,
        fontFamily: fonts.regular,
        color: colors.text,
      },
      locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 16,
      },
      location: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: colors.textSecondary,
      },
      bio: {
        fontSize: 16,
        fontFamily: fonts.regular,
        color: colors.text,
        lineHeight: 24,
        marginBottom: 16,
      },
      occupation: {
        fontSize: 16,
        fontFamily: fonts.medium,
        color: colors.text,
        marginBottom: 16,
      },
      sectionTitle: {
        fontSize: 18,
        fontFamily: fonts.semiBold,
        color: colors.text,
        marginBottom: 12,
      },
      interests: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
      },
      interestTag: {
        backgroundColor: colors.surface,
        borderRadius: 1000,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: colors.border,
      },
      interestText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.text,
      },
      actionButtons: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
        paddingBottom: 24,
      },
      actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 14,
        borderRadius: 1000,
        borderWidth: 2,
      },
      likeButton: {
        backgroundColor: colorConstants.primary,
        borderColor: colorConstants.primary,
      },
      passButton: {
        backgroundColor: 'transparent',
        borderColor: colors.border,
      },
      buttonText: {
        fontSize: 16,
        fontFamily: fonts.semiBold,
      },
      likeButtonText: {
        color: colorConstants.white,
      },
      passButtonText: {
        color: colors.text,
      },
      reportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        marginHorizontal: SCREEN_HORIZONTAL_PADDING,
        marginBottom: 24,
      },
      reportText: {
        fontSize: 14,
        fontFamily: fonts.medium,
        color: colors.textSecondary,
      },
    });

    return (
      <View style={styles.container}>
        <Stack.Screen 
          options={{ 
            title: matchProfile.name,
            headerBackTitle: 'Back',
          }} 
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: matchProfile.images[currentImageIndex] }} 
              style={styles.profileImage} 
            />
            
            <View style={styles.imageIndicators}>
              {matchProfile.images.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        idx === currentImageIndex ? colorConstants.white : 'rgba(255, 255, 255, 0.3)',
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.imageTouchLeft}
              onPress={() => {
                if (currentImageIndex > 0) {
                  setCurrentImageIndex(currentImageIndex - 1);
                }
              }}
              activeOpacity={1}
            />
            <TouchableOpacity
              style={styles.imageTouchRight}
              onPress={() => {
                if (currentImageIndex < matchProfile.images.length - 1) {
                  setCurrentImageIndex(currentImageIndex + 1);
                }
              }}
              activeOpacity={1}
            />
          </View>

          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{matchProfile.name}</Text>
              <Text style={styles.age}>{matchProfile.age}</Text>
            </View>

            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.textSecondary} />
              <Text style={styles.location}>
                {matchProfile.location} • {matchProfile.distance} km away
              </Text>
            </View>

            <Text style={styles.bio}>{matchProfile.bio}</Text>

            {matchProfile.occupation && (
              <Text style={styles.occupation}>
                {matchProfile.occupation}
                {matchProfile.company && ` at ${matchProfile.company}`}
                {matchProfile.school && ` • ${matchProfile.school}`}
              </Text>
            )}

            <Text style={styles.sectionTitle}>Interests</Text>
            <View style={styles.interests}>
              {matchProfile.interests.map((interest, idx) => (
                <View key={idx} style={styles.interestTag}>
                  <Text style={styles.interestText}>{interest}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.passButton]}
              onPress={() => router.back()}
            >
              <X size={24} color={colors.text} />
              <Text style={[styles.buttonText, styles.passButtonText]}>Pass</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, styles.likeButton]}
              onPress={() => {
                console.log('Liked:', matchProfile.name);
                router.back();
              }}
            >
              <Heart size={24} color={colorConstants.white} />
              <Text style={[styles.buttonText, styles.likeButtonText]}>Like</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.reportButton}>
            <Info size={16} color={colors.textSecondary} />
            <Text style={styles.reportText}>Report {matchProfile.name}</Text>
          </TouchableOpacity>
        </ScrollView>
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

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: user.name,
        }} 
      />
      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ uri: user.coverImage ?? 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800' }} 
            style={styles.coverImage} 
          />
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar ?? 'https://ui-avatars.com/api/?name=User&background=78706B&color=fff&size=200' }} style={styles.avatar} />
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
