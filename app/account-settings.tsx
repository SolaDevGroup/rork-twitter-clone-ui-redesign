import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, User, Calendar, MapPin, Link as LinkIcon } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function AccountSettings() {
  useAuth();
  const { colors } = useTheme();

  const accountOptions = [
    {
      id: 'account-info',
      title: 'Account information',
      description: 'See your account information like your phone number and email address.',
      icon: User,
      route: '/account-information',
    },
    {
      id: 'change-username',
      title: 'Change your username',
      description: 'Change your username',
      icon: User,
      route: '/change-username',
    },
    {
      id: 'change-password',
      title: 'Change your password',
      description: 'Change your password at any time.',
      icon: LinkIcon,
      route: '/change-password',
    },
    {
      id: 'download-archive',
      title: 'Download an archive of your data',
      description: 'Get insights into the type of information stored for your account.',
      icon: Calendar,
      route: '/download-archive',
    },
    {
      id: 'deactivate',
      title: 'Deactivate your account',
      description: 'Find out how you can deactivate your account.',
      icon: MapPin,
      route: '/deactivate-account',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Your account</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          See information about your account, download an archive of your data or learn about your account deactivation options.
        </Text>

        {accountOptions.map((option) => {
          const Icon = option.icon;
          return (
            <TouchableOpacity
              key={option.id}
              style={[styles.optionItem, { borderBottomColor: colors.border }]}
              onPress={() => router.push(option.route as any)}
            >
              <Icon size={20} color={colors.textSecondary} />
              <View style={styles.optionContent}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>{option.title}</Text>
                {option.description && (
                  <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>{option.description}</Text>
                )}
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSizes.xl,
    fontWeight: '600' as const,
  },
  spacer: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  sectionDescription: {
    fontSize: fontSizes.base,
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
    gap: spacing.lg,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    marginBottom: spacing.xs,
  },
  optionDescription: {
    fontSize: fontSizes.sm,
    lineHeight: 16,
  },
});
