import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { posts } from '@/mocks/data';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes, fonts, spacing } from '@/constants/fonts';

export default function SearchResults() {
  const { query } = useLocalSearchParams<{ query: string }>();
  const { colors } = useTheme();

  const handleComment = (postId: string) => {
    router.push({
      pathname: '/comments',
      params: { postId },
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      marginRight: spacing.lg,
    },
    headerContent: {
      flex: 1,
    },
    headerTitle: {
      fontSize: fontSizes.xl,
      fontFamily: fonts.bold,
      color: colors.text,
    },
    headerSubtitle: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginTop: 2,
    },
    listContent: {
      paddingBottom: spacing.xl,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>#{decodeURIComponent(query || '')}</Text>
          <Text style={styles.headerSubtitle}>{posts.length} posts</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard post={item} onComment={() => handleComment(item.id)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}