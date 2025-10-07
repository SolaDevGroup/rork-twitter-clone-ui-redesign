import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  ArrowLeft, 
  User, 
  Shield, 
  DollarSign, 
  Bell, 
  Globe, 
  HelpCircle,
  Lock,
  X,
  Search
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function Settings() {
  const { user } = useAuth();

  const settingsOptions = [
    {
      id: 'account',
      title: 'Your account',
      description: 'See information about your account, download an archive of your data or learn about your account deactivation options.',
      icon: User,
    },
    {
      id: 'security',
      title: 'Security and account access',
      description: "Manage your account's security and keep track of your account's usage, including apps that you have connected to your account.",
      icon: Lock,
    },
    {
      id: 'premium',
      title: 'Premium',
      description: "See what's included in Premium and manage your settings",
      icon: X,
    },
    {
      id: 'monetization',
      title: 'Monetisation',
      description: 'See how you can make money on X and manage your monetisation options.',
      icon: DollarSign,
    },
    {
      id: 'privacy',
      title: 'Privacy and safety',
      description: 'Manage what information you see and share on X.',
      icon: Shield,
      highlight: true,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Select the kinds of notification you get about your activities, interests and recommendations.',
      icon: Bell,
    },
    {
      id: 'accessibility',
      title: 'Accessibility, display and languages',
      description: 'Manage how X content is displayed to you.',
      icon: Globe,
    },
    {
      id: 'resources',
      title: 'Additional resources',
      description: 'Check out other places for helpful information to learn more about X products and services.',
      icon: HelpCircle,
    },
  ];

  const handleOptionPress = (optionId: string) => {
    const routes: Record<string, string> = {
      account: '/account-settings',
      security: '/security-settings',
      premium: '/premium-settings',
      monetization: '/monetization-settings',
      privacy: '/privacy-settings',
      notifications: '/notifications-settings',
      accessibility: '/accessibility-settings',
      resources: '/resources-settings',
    };
    
    if (routes[optionId]) {
      router.push(routes[optionId] as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>@{user?.username}</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#687684" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search settings"
          placeholderTextColor="#687684"
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingsOptions.map((option) => {
          const Icon = option.icon;
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                option.highlight && styles.highlightedOption
              ]}
              onPress={() => handleOptionPress(option.id)}
            >
              <Icon size={24} color={option.highlight ? "#fff" : "#687684"} />
              <View style={styles.optionContent}>
                <Text style={[
                  styles.optionTitle,
                  option.highlight && styles.highlightedText
                ]}>
                  {option.title}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  option.highlight && styles.highlightedDescription
                ]}>
                  {option.description}
                </Text>
              </View>
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
  headerSubtitle: {
    fontSize: fontSizes.base,
    color: colors.dark.textSecondary,
    marginTop: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.dark.surface,
    borderRadius: 20,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.md,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.lg,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: fontSizes.md,
    color: colors.dark.text,
  },
  content: {
    flex: 1,
  },
  optionItem: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  highlightedOption: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  optionContent: {
    flex: 1,
    marginLeft: SCREEN_HORIZONTAL_PADDING,
  },
  optionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.xs,
  },
  highlightedText: {
    color: colors.dark.text,
  },
  optionDescription: {
    fontSize: fontSizes.base,
    color: colors.dark.textSecondary,
    lineHeight: 18,
  },
  highlightedDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});