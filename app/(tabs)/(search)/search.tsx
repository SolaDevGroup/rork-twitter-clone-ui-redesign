import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import AnimatedSearchBar from '@/components/AnimatedSearchBar';
import { trendingTopics } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();



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
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <AnimatedSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          topics={['Search Twitter', 'Search people', 'Search topics', 'Search hashtags', 'Search posts']}
        />
      </View>

      <FlatList
        data={trendingTopics}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Trending for you</Text>
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
    </View>
  );
}