import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, Users, DollarSign, Eye } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function MonetizationAnalytics() {
  const metrics = [
    {
      id: '1',
      icon: DollarSign,
      label: 'Revenue',
      value: '$1,234',
      change: '+12.5%',
      positive: true,
    },
    {
      id: '2',
      icon: Users,
      label: 'Subscribers',
      value: '80',
      change: '+8',
      positive: true,
    },
    {
      id: '3',
      icon: Eye,
      label: 'Views',
      value: '45.2K',
      change: '+23.4%',
      positive: true,
    },
    {
      id: '4',
      icon: TrendingUp,
      label: 'Engagement',
      value: '4.8%',
      change: '+0.3%',
      positive: true,
    },
  ];

  const topContent = [
    {
      id: '1',
      title: 'How to build a successful app',
      views: '12.5K',
      revenue: '$234',
    },
    {
      id: '2',
      title: 'Design tips for beginners',
      views: '8.3K',
      revenue: '$156',
    },
    {
      id: '3',
      title: 'Marketing strategies that work',
      views: '6.7K',
      revenue: '$123',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Monetization analytics</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.periodSelector}>
          <TouchableOpacity style={styles.periodButton}>
            <Text style={styles.periodButtonText}>7 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.periodButton, styles.periodButtonActive]}>
            <Text style={[styles.periodButtonText, styles.periodButtonTextActive]}>30 Days</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.periodButton}>
            <Text style={styles.periodButtonText}>90 Days</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.metricsGrid}>
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <View key={metric.id} style={styles.metricCard}>
                <Icon size={20} color={colors.dark.textSecondary} />
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <Text style={[
                  styles.metricChange,
                  metric.positive && styles.metricChangePositive,
                ]}>
                  {metric.change}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performing Content</Text>
          {topContent.map((content, index) => (
            <View key={content.id} style={styles.contentCard}>
              <View style={styles.contentRank}>
                <Text style={styles.contentRankText}>{index + 1}</Text>
              </View>
              <View style={styles.contentInfo}>
                <Text style={styles.contentTitle}>{content.title}</Text>
                <View style={styles.contentStats}>
                  <Text style={styles.contentStat}>{content.views} views</Text>
                  <Text style={styles.contentDot}>•</Text>
                  <Text style={styles.contentStat}>{content.revenue} earned</Text>
                </View>
              </View>
            </View>
          ))}
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
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  periodButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.button,
    backgroundColor: colors.dark.surface,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: fontSizes.sm,
    fontWeight: '500' as const,
    color: colors.dark.textSecondary,
  },
  periodButtonTextActive: {
    color: colors.dark.text,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    gap: spacing.md,
  },
  metricCard: {
    width: '48%',
    backgroundColor: colors.dark.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.card,
  },
  metricValue: {
    fontSize: fontSizes.xxl,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    marginBottom: spacing.xs,
  },
  metricChange: {
    fontSize: fontSizes.sm,
    fontWeight: '500' as const,
  },
  metricChangePositive: {
    color: '#10B981',
  },
  section: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.lg,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.card,
    marginBottom: spacing.md,
  },
  contentRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  contentRankText: {
    fontSize: fontSizes.md,
    fontWeight: '700' as const,
    color: colors.dark.text,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  contentStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentStat: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  contentDot: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    marginHorizontal: spacing.xs,
  },
});
