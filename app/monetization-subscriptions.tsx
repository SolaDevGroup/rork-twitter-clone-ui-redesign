import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Users, DollarSign } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function MonetizationSubscriptions() {
  const [subscriptionsEnabled, setSubscriptionsEnabled] = useState(false);

  const tiers = [
    {
      id: '1',
      name: 'Basic Supporter',
      price: '$4.99',
      subscribers: 45,
      color: '#3B82F6',
    },
    {
      id: '2',
      name: 'Premium Supporter',
      price: '$9.99',
      subscribers: 23,
      color: '#8B5CF6',
    },
    {
      id: '3',
      name: 'VIP Supporter',
      price: '$19.99',
      subscribers: 12,
      color: '#F59E0B',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Subscriptions</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.toggleCard}>
          <View style={styles.toggleContent}>
            <Text style={styles.toggleTitle}>Enable Subscriptions</Text>
            <Text style={styles.toggleDescription}>
              Allow your followers to subscribe and support your content
            </Text>
          </View>
          <Switch
            value={subscriptionsEnabled}
            onValueChange={setSubscriptionsEnabled}
            trackColor={{ false: colors.dark.border, true: colors.primary }}
            thumbColor={colors.dark.text}
          />
        </View>

        {subscriptionsEnabled && (
          <>
            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Users size={24} color={colors.primary} />
                <Text style={styles.statValue}>80</Text>
                <Text style={styles.statLabel}>Total Subscribers</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <DollarSign size={24} color={colors.primary} />
                <Text style={styles.statValue}>$1,079</Text>
                <Text style={styles.statLabel}>Monthly Revenue</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Subscription Tiers</Text>
              {tiers.map((tier) => (
                <View key={tier.id} style={styles.tierCard}>
                  <View style={[styles.tierColor, { backgroundColor: tier.color }]} />
                  <View style={styles.tierContent}>
                    <Text style={styles.tierName}>{tier.name}</Text>
                    <Text style={styles.tierPrice}>{tier.price}/month</Text>
                  </View>
                  <View style={styles.tierStats}>
                    <Text style={styles.tierSubscribers}>{tier.subscribers}</Text>
                    <Text style={styles.tierSubscribersLabel}>subscribers</Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.addTierButton}>
              <Text style={styles.addTierButtonText}>Add New Tier</Text>
            </TouchableOpacity>
          </>
        )}

        {!subscriptionsEnabled && (
          <View style={styles.emptyState}>
            <Users size={48} color={colors.dark.textSecondary} />
            <Text style={styles.emptyTitle}>Start Earning from Subscriptions</Text>
            <Text style={styles.emptyDescription}>
              Enable subscriptions to let your followers support your content with monthly payments.
            </Text>
          </View>
        )}
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
  toggleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
  },
  toggleContent: {
    flex: 1,
    marginRight: spacing.lg,
  },
  toggleTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: fontSizes.xxl,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginTop: spacing.sm,
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
  section: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.lg,
  },
  tierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.card,
    marginBottom: spacing.md,
  },
  tierColor: {
    width: 4,
    height: 48,
    borderRadius: 2,
    marginRight: spacing.lg,
  },
  tierContent: {
    flex: 1,
  },
  tierName: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  tierPrice: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  tierStats: {
    alignItems: 'flex-end',
  },
  tierSubscribers: {
    fontSize: fontSizes.lg,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  tierSubscribersLabel: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  addTierButton: {
    backgroundColor: colors.primary,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.button,
    alignItems: 'center',
  },
  addTierButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xxxl * 2,
  },
  emptyTitle: {
    fontSize: fontSizes.xl,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
