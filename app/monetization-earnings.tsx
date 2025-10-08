import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, DollarSign, TrendingUp, Calendar } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function MonetizationEarnings() {
  const earnings = {
    total: '$1,234.56',
    thisMonth: '$234.56',
    lastMonth: '$456.78',
    pending: '$123.45',
  };

  const transactions = [
    {
      id: '1',
      date: 'Jan 15, 2025',
      amount: '$45.67',
      type: 'Subscription',
      status: 'Completed',
    },
    {
      id: '2',
      date: 'Jan 14, 2025',
      amount: '$23.45',
      type: 'Tips',
      status: 'Completed',
    },
    {
      id: '3',
      date: 'Jan 13, 2025',
      amount: '$67.89',
      type: 'Subscription',
      status: 'Pending',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your earnings</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Earnings</Text>
          <Text style={styles.summaryAmount}>{earnings.total}</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>This Month</Text>
              <Text style={styles.summaryItemValue}>{earnings.thisMonth}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemLabel}>Last Month</Text>
              <Text style={styles.summaryItemValue}>{earnings.lastMonth}</Text>
            </View>
          </View>
          <View style={styles.pendingContainer}>
            <Text style={styles.pendingLabel}>Pending</Text>
            <Text style={styles.pendingAmount}>{earnings.pending}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <DollarSign size={20} color={colors.dark.textSecondary} />
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionType}>{transaction.type}</Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </View>
              <View style={styles.transactionRight}>
                <Text style={styles.transactionAmount}>{transaction.amount}</Text>
                <Text style={[
                  styles.transactionStatus,
                  transaction.status === 'Completed' && styles.statusCompleted,
                  transaction.status === 'Pending' && styles.statusPending,
                ]}>
                  {transaction.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Calendar size={20} color={colors.primary} />
          <Text style={styles.exportButtonText}>Export Statement</Text>
        </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
  },
  summaryLabel: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: colors.dark.text,
    marginBottom: spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  summaryItem: {
    flex: 1,
  },
  summaryItemLabel: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    marginBottom: spacing.xs,
  },
  summaryItemValue: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  pendingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
  },
  pendingLabel: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
  },
  pendingAmount: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: '#F59E0B',
  },
  section: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.lg,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionInfo: {
    marginLeft: spacing.md,
  },
  transactionType: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  transactionDate: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  transactionStatus: {
    fontSize: fontSizes.sm,
  },
  statusCompleted: {
    color: '#10B981',
  },
  statusPending: {
    color: '#F59E0B',
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.button,
  },
  exportButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
});
