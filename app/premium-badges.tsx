import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Award, CheckCircle, Shield } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function PremiumBadges() {
  const badges = [
    {
      id: '1',
      icon: CheckCircle,
      name: 'Verified Badge',
      description: 'The blue checkmark shows your account is verified.',
      status: 'active',
    },
    {
      id: '2',
      icon: Award,
      name: 'Premium Badge',
      description: 'Shows you are a Premium subscriber.',
      status: 'active',
    },
    {
      id: '3',
      icon: Shield,
      name: 'Trusted Badge',
      description: 'Earned by maintaining good standing for 6+ months.',
      status: 'locked',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Premium badges</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.introText}>
            Manage your Premium badges and verification status. Badges help others identify verified and trusted accounts.
          </Text>
        </View>

        {badges.map((badge) => {
          const Icon = badge.icon;
          const isActive = badge.status === 'active';
          
          return (
            <View key={badge.id} style={styles.badgeCard}>
              <View style={[
                styles.iconContainer,
                !isActive && styles.iconContainerLocked,
              ]}>
                <Icon 
                  size={24} 
                  color={isActive ? colors.primary : colors.dark.textSecondary} 
                />
              </View>
              <View style={styles.badgeContent}>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusDot,
                    isActive ? styles.statusDotActive : styles.statusDotLocked,
                  ]} />
                  <Text style={[
                    styles.statusText,
                    isActive ? styles.statusTextActive : styles.statusTextLocked,
                  ]}>
                    {isActive ? 'Active' : 'Locked'}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About Verification</Text>
          <Text style={styles.infoText}>
            Your verified badge confirms your account is authentic. It helps people find the real you and builds trust with your audience.
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
  intro: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  introText: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
    lineHeight: 22,
  },
  badgeCard: {
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
  iconContainerLocked: {
    opacity: 0.5,
  },
  badgeContent: {
    flex: 1,
  },
  badgeName: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  badgeDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.sm,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusDotActive: {
    backgroundColor: '#10B981',
  },
  statusDotLocked: {
    backgroundColor: colors.dark.textSecondary,
  },
  statusText: {
    fontSize: fontSizes.sm,
    fontWeight: '500' as const,
  },
  statusTextActive: {
    color: '#10B981',
  },
  statusTextLocked: {
    color: colors.dark.textSecondary,
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
