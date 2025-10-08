import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Book, MessageCircle, Shield, Settings } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function ResourcesHelpCenter() {
  const categories = [
    {
      id: '1',
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of using X',
    },
    {
      id: '2',
      icon: MessageCircle,
      title: 'Posting & Engagement',
      description: 'How to create and share content',
    },
    {
      id: '3',
      icon: Shield,
      title: 'Safety & Security',
      description: 'Keep your account safe',
    },
    {
      id: '4',
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your account preferences',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Help Center</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.dark.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help"
            placeholderTextColor={colors.dark.textSecondary}
          />
        </View>

        <Text style={styles.sectionTitle}>Browse by Category</Text>

        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.primary} />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  backButton: {
    marginRight: spacing.xl,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: fontSizes.xl,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.button,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSizes.md,
    color: colors.dark.text,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: spacing.lg,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderRadius: borderRadius.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  categoryDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
});
