import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, PanResponder, Animated, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { matchProfiles } from '@/mocks/data';
import { MatchProfile } from '@/types';
import { Heart, X, Star, RotateCcw, MapPin, Search, ChevronRight } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { BlurView } from 'expo-blur';
import { colors as colorConstants } from '@/constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 120;

type TabType = 'matching' | 'jobs';

const jobsList = [
  'Software Engineer',
  'Product Manager',
  'Designer',
  'Marketing Manager',
  'Account Executive',
  'Account Manager',
  'Project Manager',
  'Business Analyst',
  'Customer Support',
  'Talent Acquisition Specialist',
];

export default function Matching() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('matching');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const position = useRef(new Animated.ValueXY()).current;
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
            friction: 4,
          }).start();
        }
      },
    })
  ).current;

  const swipeRight = () => {
    console.log('Liked:', matchProfiles[currentIndex]?.name);
    Animated.timing(position, {
      toValue: { x: SCREEN_WIDTH + 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      setCurrentImageIndex(0);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeLeft = () => {
    console.log('Passed:', matchProfiles[currentIndex]?.name);
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      setCurrentImageIndex(0);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentImageIndex(0);
      position.setValue({ x: 0, y: 0 });
    }
  };

  const handleSuperLike = () => {
    console.log('Super Liked:', matchProfiles[currentIndex]?.name);
    Animated.timing(position, {
      toValue: { x: 0, y: -SCREEN_HEIGHT - 100 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setCurrentIndex(currentIndex + 1);
      setCurrentImageIndex(0);
      position.setValue({ x: 0, y: 0 });
    });
  };

  const handleCardPress = (side: 'left' | 'right') => {
    const profile = matchProfiles[currentIndex];
    if (!profile) return;

    if (side === 'left' && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else if (side === 'right' && currentImageIndex < profile.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const renderCard = (profile: MatchProfile, index: number) => {
    const isCurrentCard = index === currentIndex;

    if (index < currentIndex) return null;

    const cardStyle: any = isCurrentCard
      ? {
          transform: [{ translateX: position.x }, { translateY: position.y }, { rotate }],
        }
      : {
          transform: [{ scale: 0.95 }],
          opacity: 0.8,
        };

    return (
      <Animated.View
        key={profile.id}
        style={[styles.card, cardStyle, { zIndex: matchProfiles.length - index }]}
        {...(isCurrentCard ? panResponder.panHandlers : {})}
      >
        <Image source={{ uri: profile.images[currentImageIndex] }} style={styles.cardImage} />

        <View style={styles.imageIndicators}>
          {profile.images.map((_, idx) => (
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
          style={styles.cardTouchLeft}
          onPress={() => handleCardPress('left')}
          activeOpacity={1}
        />
        <TouchableOpacity
          style={styles.cardTouchRight}
          onPress={() => handleCardPress('right')}
          activeOpacity={1}
        />

        {isCurrentCard && (
          <>
            <Animated.View style={[styles.likeLabel, { opacity: likeOpacity }]}>
              <Text style={styles.labelText}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[styles.nopeLabel, { opacity: nopeOpacity }]}>
              <Text style={styles.labelText}>NOPE</Text>
            </Animated.View>
          </>
        )}

        <BlurView intensity={16} style={styles.cardInfo}>
          <View style={styles.infoHeader}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, { color: colorConstants.white }]}>{profile.name}</Text>
              <Text style={[styles.age, { color: colorConstants.white }]}>{profile.age}</Text>
            </View>
            <View style={styles.locationRow}>
              <MapPin size={14} color={colorConstants.white} />
              <Text style={[styles.location, { color: colorConstants.white }]}>
                {profile.distance} km away
              </Text>
            </View>
          </View>

          <Text style={[styles.bio, { color: colorConstants.white }]} numberOfLines={2}>
            {profile.bio}
          </Text>

          {profile.occupation && (
            <Text style={[styles.occupation, { color: colorConstants.white }]}>
              {profile.occupation}
              {profile.company && ` at ${profile.company}`}
              {profile.school && ` • ${profile.school}`}
            </Text>
          )}

          <View style={styles.interests}>
            {profile.interests.slice(0, 3).map((interest, idx) => (
              <View key={idx} style={[styles.interestTag, { borderColor: colorConstants.white }]}>
                <Text style={[styles.interestText, { color: colorConstants.white }]}>{interest}</Text>
              </View>
            ))}
          </View>
        </BlurView>
      </Animated.View>
    );
  };

  const renderJobsTab = () => {
    return (
      <View style={styles.jobsContainer}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search jobs"
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          Try searching for
        </Text>

        <ScrollView 
          style={styles.jobsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.jobsListContent}
        >
          {jobsList.map((job, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.jobItem, { borderBottomColor: colors.border }]}
              onPress={() => console.log('Selected job:', job)}
            >
              <Text style={[styles.jobText, { color: colors.text }]}>{job}</Text>
              <ChevronRight size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: insets.top,
    },
    toggleContainer: {
      flexDirection: 'row',
      marginHorizontal: SCREEN_HORIZONTAL_PADDING,
      marginTop: 16,
      marginBottom: 16,
      backgroundColor: colors.surface,
      borderRadius: 1000,
      padding: 4,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 1000,
      alignItems: 'center',
      justifyContent: 'center',
    },
    toggleButtonActive: {
      backgroundColor: colorConstants.primary,
    },
    toggleText: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.textSecondary,
    },
    toggleTextActive: {
      color: colorConstants.white,
    },
    cardsContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 140,
    },
    card: {
      position: 'absolute',
      width: SCREEN_WIDTH - 32,
      height: SCREEN_HEIGHT * 0.58,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: colors.surface,
    },
    cardImage: {
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
      height: 2,
      borderRadius: 2,
    },
    cardTouchLeft: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '50%',
      zIndex: 5,
    },
    cardTouchRight: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: '50%',
      zIndex: 5,
    },
    likeLabel: {
      position: 'absolute',
      top: 50,
      right: 40,
      borderWidth: 4,
      borderColor: '#22C55E',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      transform: [{ rotate: '20deg' }],
      zIndex: 10,
    },
    nopeLabel: {
      position: 'absolute',
      top: 50,
      left: 40,
      borderWidth: 4,
      borderColor: '#EF4444',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      transform: [{ rotate: '-20deg' }],
      zIndex: 10,
    },
    labelText: {
      fontSize: 32,
      fontWeight: '700' as const,
      color: '#FFFFFF',
    },
    cardInfo: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 10,
    },
    infoHeader: {
      marginBottom: 8,
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 4,
    },
    name: {
      fontSize: 24,
      fontWeight: '600' as const,
    },
    age: {
      fontSize: 24,
      fontWeight: '400' as const,
    },
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    location: {
      fontSize: 14,
      fontWeight: '400' as const,
    },
    bio: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 8,
    },
    occupation: {
      fontSize: 14,
      marginBottom: 8,
    },
    interests: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    interestTag: {
      borderWidth: 1,
      borderRadius: 1000,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    interestText: {
      fontSize: 12,
      fontWeight: '500' as const,
    },
    buttonsContainer: {
      position: 'absolute',
      bottom: 100,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      gap: 16,
    },
    actionButton: {
      width: 56,
      height: 56,
      borderRadius: 1000,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colorConstants.white,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    superLikeButton: {
      width: 64,
      height: 64,
    },
    noMoreCards: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 32,
    },
    noMoreText: {
      fontSize: 20,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    noMoreSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    jobsContainer: {
      flex: 1,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 1000,
      paddingHorizontal: 16,
      height: 44,
      marginBottom: 24,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      fontWeight: '400' as const,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '400' as const,
      marginBottom: 16,
    },
    jobsList: {
      flex: 1,
    },
    jobsListContent: {
      paddingBottom: 100,
    },
    jobItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
    },
    jobText: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
  });

  const renderMatchingTab = () => {
    if (currentIndex >= matchProfiles.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreText}>No More Profiles</Text>
          <Text style={styles.noMoreSubtext}>
            Check back later for new matches in your area
          </Text>
        </View>
      );
    }

    return (
      <>
        <View style={styles.cardsContainer}>
          {matchProfiles.map((profile, index) => renderCard(profile, index))}
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleUndo}
            disabled={currentIndex === 0}
          >
            <RotateCcw size={24} color={currentIndex === 0 ? '#CCC' : '#F59E0B'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={swipeLeft}>
            <X size={28} color="#EF4444" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.superLikeButton]}
            onPress={handleSuperLike}
          >
            <Star size={28} color="#3B82F6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={swipeRight}>
            <Heart size={28} color="#22C55E" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => console.log('Boost')}>
            <Star size={24} color="#8B5CF6" />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === 'matching' && styles.toggleButtonActive,
          ]}
          onPress={() => setActiveTab('matching')}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === 'matching' && styles.toggleTextActive,
            ]}
          >
            Matching
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === 'jobs' && styles.toggleButtonActive,
          ]}
          onPress={() => setActiveTab('jobs')}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === 'jobs' && styles.toggleTextActive,
            ]}
          >
            Jobs
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'matching' ? renderMatchingTab() : renderJobsTab()}
    </View>
  );
}
