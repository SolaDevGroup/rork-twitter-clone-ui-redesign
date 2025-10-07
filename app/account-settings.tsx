import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ChevronRight, User, Calendar, MapPin, Link as LinkIcon } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing } from '@/constants/fonts';

export default function AccountSettings() {
  useAuth();

  const accountOptions = [
    {
      id: 'account-info',
      title: 'Account information',
      description: 'See your account information like your phone number and email address.',
      icon: User,
    },
    {
      id: 'change-username',
      title: 'Change your username',
      description: 'Change your username',
      icon: User,
    },
    {
      id: 'change-password',
      title: 'Change your password',
      description: 'Change your password at any time.',
      icon: LinkIcon,
    },
    {
      id: 'download-archive',
      title: 'Download an archive of your data',
      description: 'Get insights into the type of information stored for your account.',
      icon: Calendar,
    },
    {
      id: 'deactivate',
      title: 'Deactivate your account',
      description: 'Find out how you can deactivate your account.',
      icon: MapPin,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your account</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionDescription}>
          See information about your account, download an archive of your data or learn about your account deactivation options.
        </Text>

        {accountOptions.map((option) => {
          const Icon = option.icon;
          return (
            <TouchableOpacity
              key={option.id}
              style={styles.optionItem}
              onPress={() => console.log('Selected:', option.id)}
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
