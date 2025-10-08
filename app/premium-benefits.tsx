import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Check, Edit3, FileText, Shield, Zap, BarChart3, Palette } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function PremiumBenefits() {
  const benefits = [
    {
      id: '1',
      icon: Edit3,
      title: 'Edit posts',
      description: 'Edit your posts up to 5 times within 30 minutes of posting.',
    },
    {
      id: '2',
      icon: FileText,
      title: 'Longer posts',
      description: 'Write posts up to 25,000 characters long.',
    },
    {
      id: '3',
      icon: Check,
      title: 'Verified checkmark',
      description: 'Get the blue checkmark to show your account is verified.',
    },
    {
      id: '4',
      icon: Shield,
      title: 'Reduced ads',
      description: 'See approximately 50% fewer ads in your timeline.',
    },
    {
      id: '5',
      icon: Zap,
      title: 'Priority support',
      description: 'Get faster responses from our support team.',
    },
    {
      id: '6',
      icon: BarChart3,
      title: 'Advanced analytics',
      description: 'Access detailed analytics about your posts and audience.',
    },
    {
      id: '7',
      icon: Palette,
      title: 'Custom app icons',
      description: 'Choose from exclusive app icons to personalize your experience.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Premium benefits</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Unlock exclusive features and enhance your experience with Premium.
          </Text>
        </View>

        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <View key={benefit.id} style={styles.benefitCard}>
              <View style={styles.iconContainer}>
                <Icon size={24} color={colors.primary} />
              </View>
              <View style={styles.benefitContent}>
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.upgradeButton}>
          <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
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
  intro: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  introText: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
    lineHeight: 22,
  },
  benefitCard: {
    flexDirection: 'row',
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
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  benefitDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xxxl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.button,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
});
