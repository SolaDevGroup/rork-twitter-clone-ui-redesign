import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft, ChevronRight, Shield, Eye, Users, MessageSquare, MapPin, Tag } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing } from '@/constants/fonts';

export default function PrivacySettings() {
  const privacyOptions = [
    {
      id: 'audience',
      title: 'Audience and tagging',
      description: 'Manage what information you allow other people on X to see.',
      icon: Users,
      route: '/privacy-audience',
    },
    {
      id: 'content',
      title: 'Your posts',
      description: 'Manage the information associated with your posts.',
      icon: MessageSquare,
      route: '/privacy-posts',
    },
    {
      id: 'location',
      title: 'Location information',
      description: 'Manage the location information X uses to personalize your experience.',
      icon: MapPin,
      route: '/privacy-location',
    },
    {
      id: 'discoverability',
      title: 'Discoverability and contacts',
      description: 'Control your discoverability settings and manage contacts.',
      icon: Eye,
      route: '/privacy-discoverability',
    },
    {
      id: 'data-sharing',
      title: 'Data sharing and personalization',
      description: 'Control how X shares your data with business partners and how we personalize your experience.',
      icon: Tag,
      route: '/privacy-data-sharing',
    },
    {
      id: 'blocking',
      title: 'Blocking and muting',
      description: 'Manage the accounts, words, and notifications that you have muted or blocked.',
      icon: Shield,
      route: '/privacy-blocking',
    },
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Privacy and safety</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionDescription}>
          Manage what information you see and share on X.
        </Text>

        {privacyOptions.map((option) => {
          const Icon = option.icon;
          return (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => router.push(option.route as any)}
            >
              <Icon size={20} color={colors.dark.textSecondary} />
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                {option.description && (
                  <Text style={styles.optionDescription}>{option.description}</Text>
                )}
              </View>
              <ChevronRight size={20} color={colors.dark.textSecondary} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
    </>
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
  sectionDescription: {
    fontSize: fontSizes.base,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  optionContent: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  optionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 16,
  },
});
