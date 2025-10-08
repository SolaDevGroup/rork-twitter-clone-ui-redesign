import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, Star, CreditCard, Gift, Award } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function PremiumSettings() {
  const premiumOptions = [
    {
      id: 'subscription',
      title: 'Manage subscription',
      description: 'View and manage your Premium subscription.',
      icon: Star,
      route: '/premium-subscription',
    },
    {
      id: 'billing',
      title: 'Billing information',
      description: 'Update your payment method and billing details.',
      icon: CreditCard,
      route: '/premium-billing',
    },
    {
      id: 'benefits',
      title: 'Premium benefits',
      description: 'See all the benefits included in your Premium subscription.',
      icon: Gift,
      route: '/premium-benefits',
    },
    {
      id: 'badges',
      title: 'Premium badges',
      description: 'Manage your Premium badges and verification.',
      icon: Award,
      route: '/premium-badges',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Premium</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.premiumBanner}>
          <Star size={32} color={colors.primary} />
          <Text style={styles.bannerTitle}>Upgrade to Premium</Text>
          <Text style={styles.bannerDescription}>
            Get access to exclusive features and support the platform.
          </Text>
          <TouchableOpacity style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionDescription}>
          See what&apos;s included in Premium and manage your settings
        </Text>

        {premiumOptions.map((option) => {
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
  premiumBanner: {
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    padding: spacing.xxxl,
    borderRadius: borderRadius.card,
    alignItems: 'center',
  },
  bannerTitle: {
    fontSize: fontSizes.xxl,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  bannerDescription: {
    fontSize: fontSizes.base,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.button,
  },
  upgradeButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
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
