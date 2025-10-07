import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function AccountInformation() {
  const { user } = useAuth();
  const { colors } = useTheme();

  const accountInfo = [
    { label: 'Username', value: user?.username || '@username' },
    { label: 'Phone', value: '+1 (555) 123-4567' },
    { label: 'Email', value: 'user@example.com' },
    { label: 'Account created', value: 'January 2024' },
    { label: 'Country', value: 'United States' },
    { label: 'Languages', value: 'English' },
    { label: 'Gender', value: 'Not specified' },
    { label: 'Birth date', value: 'Not specified' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Account information</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          See your account information like your phone number and email address.
        </Text>

        {accountInfo.map((item, index) => (
          <View key={index} style={[styles.infoItem, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{item.label}</Text>
            <Text style={[styles.value, { color: colors.text }]}>{item.value}</Text>
          </View>
        ))}
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
  description: {
    fontSize: fontSizes.base,
    lineHeight: 20,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  infoItem: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: fontSizes.sm,
    marginBottom: spacing.xs,
  },
  value: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
  },
});
