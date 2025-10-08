import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function NotificationFilters() {
  const { colors, primary } = useTheme();
  const [qualityFilter, setQualityFilter] = React.useState(false);
  const [muteNotifications, setMuteNotifications] = React.useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Filters</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Choose the notifications you would like to see - and those you don&apos;t.
        </Text>

        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quality filter</Text>
          <View style={styles.toggleItem}>
            <View style={styles.toggleContent}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Filter low-quality notifications</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                Remove notifications from accounts that might be spam or automated.
              </Text>
            </View>
            <Switch
              value={qualityFilter}
              onValueChange={setQualityFilter}
              trackColor={{ false: colors.border, true: primary }}
              thumbColor={colors.text}
            />
          </View>
        </View>

        <View style={[styles.section, { borderBottomColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Muted notifications</Text>
          <View style={styles.toggleItem}>
            <View style={styles.toggleContent}>
              <Text style={[styles.toggleTitle, { color: colors.text }]}>Mute notifications from people you don&apos;t follow</Text>
              <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
                You won&apos;t receive notifications from people you don&apos;t follow.
              </Text>
            </View>
            <Switch
              value={muteNotifications}
              onValueChange={setMuteNotifications}
              trackColor={{ false: colors.border, true: primary }}
              thumbColor={colors.text}
            />
          </View>
        </View>
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
  section: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginBottom: spacing.md,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.lg,
    gap: spacing.lg,
  },
  toggleContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: fontSizes.sm,
    lineHeight: 16,
  },
});
