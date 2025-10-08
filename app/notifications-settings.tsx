import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft, ChevronRight, Bell, Mail, Smartphone } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing } from '@/constants/fonts';

export default function NotificationsSettings() {
  const [pushEnabled, setPushEnabled] = React.useState(true);
  const [emailEnabled, setEmailEnabled] = React.useState(true);

  const notificationOptions = [
    {
      id: 'filters',
      title: 'Filters',
      description: 'Choose the notifications you would like to see - and those you don&apos;t.',
      icon: Bell,
      route: '/notification-filters',
    },
    {
      id: 'preferences',
      title: 'Preferences',
      description: 'Select your preferences by notification type.',
      icon: Smartphone,
      route: '/notification-preferences',
    },
    {
      id: 'email',
      title: 'Email notifications',
      description: 'Control when and how often X sends you emails.',
      icon: Mail,
      route: '/email-notifications',
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
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionDescription}>
          Select the kinds of notification you get about your activities, interests and recommendations.
        </Text>

        <View style={styles.toggleSection}>
          <View style={styles.toggleItem}>
            <View style={styles.toggleContent}>
              <Text style={styles.toggleTitle}>Push notifications</Text>
              <Text style={styles.toggleDescription}>
                Get push notifications to find out what&apos;s going on when you&apos;re not on X.
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: colors.dark.border, true: colors.primary }}
              thumbColor={colors.dark.text}
            />
          </View>

          <View style={styles.toggleItem}>
            <View style={styles.toggleContent}>
              <Text style={styles.toggleTitle}>Email notifications</Text>
              <Text style={styles.toggleDescription}>
                Get emails to find out what&apos;s going on when you&apos;re not on X.
              </Text>
            </View>
            <Switch
              value={emailEnabled}
              onValueChange={setEmailEnabled}
              trackColor={{ false: colors.dark.border, true: colors.primary }}
              thumbColor={colors.dark.text}
            />
          </View>
        </View>

        {notificationOptions.map((option) => {
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
  toggleSection: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
    marginBottom: spacing.sm,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.dark.border,
  },
  toggleContent: {
    flex: 1,
    marginRight: spacing.lg,
  },
  toggleTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: fontSizes.sm,
    color: colors.dark.textSecondary,
    lineHeight: 16,
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
