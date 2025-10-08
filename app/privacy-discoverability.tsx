import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function PrivacyDiscoverability() {
  const { colors, primary } = useTheme();
  const [discoverableByEmail, setDiscoverableByEmail] = React.useState(true);
  const [discoverableByPhone, setDiscoverableByPhone] = React.useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Discoverability and contacts</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Control your discoverability settings and manage contacts.
        </Text>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Let others find you by email</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Let people who have your email address find and connect with you.
            </Text>
          </View>
          <Switch
            value={discoverableByEmail}
            onValueChange={setDiscoverableByEmail}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Let others find you by phone number</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Let people who have your phone number find and connect with you.
            </Text>
          </View>
          <Switch
            value={discoverableByPhone}
            onValueChange={setDiscoverableByPhone}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
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
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
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
