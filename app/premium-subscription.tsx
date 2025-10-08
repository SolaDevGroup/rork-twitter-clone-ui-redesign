import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Star, Check } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function PremiumSubscription() {
  const subscriptionTiers = [
    {
      id: 'basic',
      name: 'Premium Basic',
      price: '$8',
      period: 'month',
      features: [
        'Edit posts',
        'Longer posts',
        'Verified checkmark',
        'Reduced ads',
      ],
    },
    {
      id: 'plus',
      name: 'Premium Plus',
      price: '$16',
      period: 'month',
      features: [
        'All Basic features',
        'No ads',
        'Priority support',
        'Advanced analytics',
        'Custom app icons',
      ],
      highlighted: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Manage subscription</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.currentPlan}>
          <Text style={styles.sectionTitle}>Current Plan</Text>
          <View style={styles.planCard}>
            <Star size={24} color={colors.primary} />
            <Text style={styles.planName}>Free Plan</Text>
            <Text style={styles.planDescription}>
              Upgrade to Premium to unlock exclusive features
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Available Plans</Text>
        {subscriptionTiers.map((tier) => (
          <View
            key={tier.id}
            style={[
              styles.tierCard,
              tier.highlighted && styles.highlightedTier,
            ]}
          >
            {tier.highlighted && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>Most Popular</Text>
              </View>
            )}
            <Text style={styles.tierName}>{tier.name}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{tier.price}</Text>
              <Text style={styles.period}>/{tier.period}</Text>
            </View>
            <View style={styles.featuresContainer}>
              {tier.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={16} color={colors.primary} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        ))}
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
  currentPlan: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.lg,
  },
  planCard: {
    backgroundColor: colors.dark.surface,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
    alignItems: 'center',
  },
  planName: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginTop: spacing.md,
  },
  planDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  tierCard: {
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: spacing.lg,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  highlightedTier: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.button,
  },
  popularText: {
    fontSize: fontSizes.sm,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  tierName: {
    fontSize: fontSizes.xl,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xl,
  },
  price: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  period: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
    marginLeft: spacing.xs,
  },
  featuresContainer: {
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureText: {
    fontSize: fontSizes.md,
    color: colors.dark.text,
    marginLeft: spacing.md,
  },
  subscribeButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.button,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
});
