import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function PrivacyDataSharing() {
  const { colors, primary } = useTheme();
  const [personalization, setPersonalization] = React.useState(true);
  const [dataSharing, setDataSharing] = React.useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Data sharing and personalization</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Control how X shares your data with business partners and how we personalize your experience.
        </Text>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Personalized ads</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              You will see ads on X based on your activity.
            </Text>
          </View>
          <Switch
            value={personalization}
            onValueChange={setPersonalization}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Share data with business partners</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Allow X to share your data with select business partners.
            </Text>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
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
