import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft, ChevronRight, Lock, Shield, Smartphone, Key, Eye } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing } from '@/constants/fonts';

export default function SecuritySettings() {
  const securityOptions = [
    {
      id: 'two-factor',
      title: 'Two-factor authentication',
      description: 'Manage two-factor authentication options.',
      icon: Shield,
      route: '/security-two-factor',
    },
    {
      id: 'password',
      title: 'Password',
      description: 'Change your password at any time.',
      icon: Lock,
      route: '/change-password',
    },
    {
      id: 'sessions',
      title: 'Apps and sessions',
      description: 'See information about when you logged into your account and the apps you connected to your account.',
      icon: Smartphone,
      route: '/security-sessions',
    },
    {
      id: 'connected-accounts',
      title: 'Connected accounts',
      description: 'Manage Google or Apple accounts connected to your account to log in.',
      icon: Key,
      route: '/security-connected-accounts',
    },
    {
      id: 'account-access',
      title: 'Account access history',
      description: 'See your account access history.',
      icon: Eye,
      route: '/security-access-history',
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
          <Text style={styles.headerTitle}>Security and account access</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionDescription}>
          Manage your account&apos;s security and keep track of your account&apos;s usage, including apps that you have connected to your account.
        </Text>

        {securityOptions.map((option) => {
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
