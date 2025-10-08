import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Users, Target, Heart, Globe } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function ResourcesAbout() {
  const values = [
    {
      id: '1',
      icon: Users,
      title: 'Community First',
      description: 'We believe in building a platform that puts people first.',
    },
    {
      id: '2',
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push boundaries to create better experiences.',
    },
    {
      id: '3',
      icon: Heart,
      title: 'Authenticity',
      description: 'We value genuine connections and real conversations.',
    },
    {
      id: '4',
      icon: Globe,
      title: 'Global Impact',
      description: 'We aim to connect people across the world.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>About X</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Our Mission</Text>
          <Text style={styles.heroDescription}>
            To give everyone the power to create and share ideas and information instantly, without barriers.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Our Values</Text>

        {values.map((value) => {
          const Icon = value.icon;
          return (
            <View key={value.id} style={styles.valueCard}>
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.primary} />
              </View>
              <View style={styles.valueContent}>
                <Text style={styles.valueTitle}>{value.title}</Text>
                <Text style={styles.valueDescription}>{value.description}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>500M+</Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>195</Text>
            <Text style={styles.statLabel}>Countries</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Join Our Journey</Text>
          <Text style={styles.infoText}>
            We&apos;re constantly evolving and improving. Your feedback helps us build a better platform for everyone.
          </Text>
        </View>
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
  heroSection: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xxxl,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: fontSizes.xxxl,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: spacing.lg,
  },
  heroDescription: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: spacing.lg,
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  valueDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSizes.xxxl,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.dark.border,
    marginHorizontal: spacing.lg,
  },
  infoCard: {
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
  },
  infoTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
});
