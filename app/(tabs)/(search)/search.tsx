import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Search as SearchIcon } from 'lucide-react-native';
import { trendingTopics } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#687684" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Twitter"
            placeholderTextColor="#687684"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F3F4',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: '#0F1419',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F1419',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  trendItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  trendCategory: {
    fontSize: 13,
    color: '#687684',
    marginBottom: 2,
  },
  trendName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F1419',
    marginBottom: 2,
  },
  trendTweets: {
    fontSize: 13,
    color: '#687684',
  },
});