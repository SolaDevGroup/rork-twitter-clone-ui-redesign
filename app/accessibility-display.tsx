import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Check } from 'lucide-react-native';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { colors } from '@/constants/colors';
import { fontSizes, spacing, borderRadius } from '@/constants/fonts';

export default function AccessibilityDisplay() {
  const [selectedFontSize, setSelectedFontSize] = useState('medium');
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const fontSizeOptions = [
    { id: 'small', label: 'Small', preview: 14 },
    { id: 'medium', label: 'Medium', preview: 16 },
    { id: 'large', label: 'Large', preview: 18 },
    { id: 'extra-large', label: 'Extra Large', preview: 20 },
  ];

  const themeOptions = [
    { id: 'light', label: 'Light', color: '#FFFFFF' },
    { id: 'dark', label: 'Dark', color: '#000000' },
    { id: 'auto', label: 'Auto', color: '#666666' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Display</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionDescription}>
          Manage your font size, color, and background. These settings affect all the X accounts on this browser.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Size</Text>
          {fontSizeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => setSelectedFontSize(option.id)}
            >
              <Text style={[styles.optionLabel, { fontSize: option.preview }]}>
                {option.label}
              </Text>
              {selectedFontSize === option.id && (
                <Check size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => setSelectedTheme(option.id)}
            >
              <View style={styles.themeOption}>
                <View style={[styles.themeColor, { backgroundColor: option.color }]} />
                <Text style={styles.optionLabel}>{option.label}</Text>
              </View>
              {selectedTheme === option.id && (
                <Check size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>
          <Text style={styles.previewText}>
            This is how your text will appear with the selected settings.
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
  sectionDescription: {
    fontSize: fontSizes.base,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  section: {
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.dark.border,
  },
  optionLabel: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    color: colors.dark.text,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: spacing.md,
    borderWidth: 1,
    borderColor: colors.dark.border,
  },
  previewCard: {
    backgroundColor: colors.dark.surface,
    marginHorizontal: SCREEN_HORIZONTAL_PADDING,
    marginVertical: spacing.xl,
    padding: spacing.xl,
    borderRadius: borderRadius.card,
  },
  previewTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: spacing.sm,
  },
  previewText: {
    fontSize: fontSizes.md,
    color: colors.dark.textSecondary,
    lineHeight: 22,
  },
});
