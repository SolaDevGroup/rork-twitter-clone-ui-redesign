import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import AnimatedSearchBar from '@/components/AnimatedSearchBar';
import { trendingTopics, users } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { CheckCircle } from 'lucide-react-native';

type FilterTab = 'Topics' | 'People';
type TopicCategory = 'Technology' | 'Politics' | 'Sports' | 'Entertainment' | 'Music' | 'Food' | 'Gaming' | 'Health';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Topics');
  const [selectedTopic, setSelectedTopic] = useState<TopicCategory>('Technology');
  const insets = useSafeAreaInsets();
  const { colors, primary } = useTheme();

  const topicCategories: TopicCategory[] = ['Technology', 'Politics', 'Sports', 'Entertainment', 'Music', 'Food', 'Gaming', 'Health'];



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterTabs: {
      flexDirection: 'row' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      gap: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterTab: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.inputBackground,
    },
    filterTabActive: {
      backgroundColor: primary,
    },
    filterTabText: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
    },
    filterTabTextActive: {
      color: '#FFFFFF',
    },
    topicButtons: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    topicButtonsScroll: {
      gap: 8,
    },
    topicButton: {
      height: 32,
      paddingHorizontal: 16,
      borderRadius: 16,
      backgroundColor: colors.inputBackground,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },
    topicButtonActive: {
      backgroundColor: primary,
    },
    topicButtonText: {
      fontSize: fontSizes.sm,
      fontWeight: '600' as const,
      color: colors.text,
    },
    topicButtonTextActive: {
      color: '#FFFFFF',
    },
    sectionTitle: {
      fontSize: fontSizes.xl,
      fontWeight: '700' as const,
      color: colors.text,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
    },
    trendItem: {
      flexDirection: 'row' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
    },
    trendImage: {
      width: 80,
      height: 45,
      borderRadius: 12,
      backgroundColor: colors.inputBackground,
    },
    trendContent: {
      flex: 1,
      justifyContent: 'center' as const,
    },
    trendCategory: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginBottom: 2,
    },
    trendName: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 2,
    },
    trendTweets: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    userCard: {
      flexDirection: 'row' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
      alignItems: 'center' as const,
    },
    userAvatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.inputBackground,
    },
    userInfo: {
      flex: 1,
    },
    userNameRow: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 4,
      marginBottom: 2,
    },
    userName: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
    },
    userUsername: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    userBio: {
      fontSize: fontSizes.sm,
      color: colors.text,
      marginTop: 2,
    },
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable onPress={() => router.push('/job-search')} style={styles.header}>
        <AnimatedSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          topics={['Search Twitter', 'Search people', 'Search topics', 'Search hashtags', 'Search posts']}
        />
      </Pressable>

      <View style={styles.filterTabs}>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'Topics' && styles.filterTabActive]}
          onPress={() => setActiveFilter('Topics')}
        >
          <Text style={[styles.filterTabText, activeFilter === 'Topics' && styles.filterTabTextActive]}>
            Topics
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterTab, activeFilter === 'People' && styles.filterTabActive]}
          onPress={() => setActiveFilter('People')}
        >
          <Text style={[styles.filterTabText, activeFilter === 'People' && styles.filterTabTextActive]}>
            People
          </Text>
        </TouchableOpacity>
      </View>

      {activeFilter === 'Topics' && (
        <View style={styles.topicButtons}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.topicButtonsScroll}>
            {topicCategories.map((topic) => (
              <TouchableOpacity
                key={topic}
                style={[styles.topicButton, selectedTopic === topic && styles.topicButtonActive]}
                onPress={() => setSelectedTopic(topic)}
              >
                <Text style={[styles.topicButtonText, selectedTopic === topic && styles.topicButtonTextActive]}>
                  {topic}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {activeFilter === 'Topics' ? (
        <FlatList
          data={trendingTopics}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>Trending in {selectedTopic}</Text>
          }
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              style={styles.trendItem}
              onPress={() => router.push({
                pathname: '/search-results',
                params: { query: item.name }
              })}
            >
              <Image 
                source={{ uri: `https://images.unsplash.com/photo-${['1517694712202-14dd9538aa97', '1498050108023-c5249f4df085', '1541432901042-2d8bd64b4a9b', '1514888286974-6c03e2ca1dba', '1506905925346-21bda4d32df4'][index % 5]}?w=160&h=90&fit=crop` }}
                style={styles.trendImage}
              />
              <View style={styles.trendContent}>
                <Text style={styles.trendTweets}>{item.tweets}</Text>
                <Text style={styles.trendCategory}>{item.category}</Text>
                <Text style={styles.trendName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <Text style={styles.sectionTitle}>Suggested People</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.userCard}
              onPress={() => router.push({
                pathname: '/(tabs)/(profile)/[profileId]',
                params: { profileId: item.id }
              })}
            >
              <Image 
                source={{ uri: item.avatar }}
                style={styles.userAvatar}
              />
              <View style={styles.userInfo}>
                <View style={styles.userNameRow}>
                  <Text style={styles.userName}>{item.name}</Text>
                  {item.isVerified && (
                    <CheckCircle size={16} color={primary} fill={primary} />
                  )}
                </View>
                <Text style={styles.userUsername}>@{item.username}</Text>
                {item.bio && <Text style={styles.userBio} numberOfLines={1}>{item.bio}</Text>}
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}