import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { trendingTopics } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';

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
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: colors.text,
    },
    sectionTitle: {
      fontSize: fontSizes.xl,
      fontWeight: '700' as const,
      color: colors.text,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    trendItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
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
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Twitter"
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={trendingTopics}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Trending for you</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.trendItem}
            onPress={() => router.push({
              pathname: '/search-results',
              params: { query: item.name }
            })}
          >
            <Text style={styles.trendCategory}>{item.category}</Text>
            <Text style={styles.trendName}>{item.name}</Text>
            <Text style={styles.trendTweets}>{item.tweets}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}