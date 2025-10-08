import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Wallet, Plus, Check } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function MonetizationPayout() {
  const [selectedSchedule, setSelectedSchedule] = useState('monthly');

  const payoutMethods = [
    {
      id: '1',
      type: 'Bank Account',
      details: 'Chase •••• 4567',
      isDefault: true,
    },
  ];

  const scheduleOptions = [
    { id: 'weekly', label: 'Weekly', description: 'Every Monday' },
    { id: 'biweekly', label: 'Bi-weekly', description: 'Every other Monday' },
    { id: 'monthly', label: 'Monthly', description: 'First Monday of the month' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Payout settings</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Payout Methods</Text>
            <TouchableOpacity style={styles.addButton}>
              <Plus size={20} color={colors.primary} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {payoutMethods.map((method) => (
            <View key={method.id} style={styles.methodCard}>
              <Wallet size={24} color={colors.dark.textSecondary} />
              <View style={styles.methodInfo}>
                <Text style={styles.methodType}>{method.type}</Text>
                <Text style={styles.methodDetails}>{method.details}</Text>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout Schedule</Text>
          <Text style={styles.sectionDescription}>
            Choose how often you want to receive your earnings
          </Text>

          {scheduleOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.scheduleOption}
              onPress={() => setSelectedSchedule(option.id)}
            >
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleLabel}>{option.label}</Text>
                <Text style={styles.scheduleDescription}>{option.description}</Text>
              </View>
              <View style={[
                styles.radio,
                selectedSchedule === option.id && styles.radioSelected,
              ]}>
                {selectedSchedule === option.id && (
                  <Check size={16} color={colors.dark.text} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Minimum Payout</Text>
          <Text style={styles.infoText}>
            You must have at least $50 in earnings to receive a payout. If your balance is below this threshold, your earnings will roll over to the next payout period.
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
  section: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  sectionDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 18,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: fontSizes.md,
    color: colors.primary,
    marginLeft: spacing.xs,
    fontWeight: '600' as const,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.card,
  },
  methodInfo: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  methodType: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  methodDetails: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  defaultBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.button,
  },
  defaultText: {
    fontSize: fontSizes.sm,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  scheduleOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.card,
    marginBottom: spacing.md,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleLabel: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  scheduleDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.dark.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
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
