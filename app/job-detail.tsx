import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { jobListings } from '@/mocks/data';
import { ArrowLeft, Share2, Briefcase } from 'lucide-react-native';

export default function JobDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isSaved, setIsSaved] = useState(false);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const job = jobListings.find(j => j.id === id);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingTop: insets.top + 8,
      paddingBottom: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    shareButton: {
      width: 40,
      height: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    content: {
      flex: 1,
    },
    topSection: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    logoContainer: {
      width: 64,
      height: 64,
      borderRadius: 12,
      overflow: 'hidden' as const,
      backgroundColor: colors.surface,
      marginBottom: 16,
    },
    logo: {
      width: 64,
      height: 64,
    },
    jobTitle: {
      fontSize: fontSizes.xxl,
      fontWeight: '700' as const,
      color: colors.text,
      marginBottom: 8,
      lineHeight: 32,
    },
    location: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      marginBottom: 16,
    },
    companySection: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 12,
      marginBottom: 16,
    },
    companyLogoSmall: {
      width: 40,
      height: 40,
      borderRadius: 8,
      overflow: 'hidden' as const,
      backgroundColor: colors.surface,
    },
    companyLogoImage: {
      width: 40,
      height: 40,
    },
    companyInfo: {
      flex: 1,
    },
    companyName: {
      fontSize: fontSizes.lg,
      fontWeight: '600' as const,
      color: colors.text,
    },
    departmentRow: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 6,
      marginTop: 2,
    },
    departmentText: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    section: {
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sectionTitle: {
      fontSize: fontSizes.lg,
      fontWeight: '700' as const,
      color: colors.text,
      marginBottom: 12,
    },
    sectionText: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      lineHeight: 24,
    },
    paragraph: {
      marginBottom: 12,
    },
    listItem: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      lineHeight: 24,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingTop: 16,
      paddingBottom: insets.bottom + 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      gap: 12,
      backgroundColor: colors.background,
    },
    saveButton: {
      flex: 1,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: colors.text,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
      gap: 8,
    },
    saveButtonText: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
    },
    applyButton: {
      flex: 1,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.text,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      flexDirection: 'row' as const,
      gap: 8,
    },
    applyButtonText: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.background,
    },
    notFoundContainer: {
      flex: 1,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      backgroundColor: colors.background,
    },
    notFoundText: {
      fontSize: fontSizes.lg,
      color: colors.text,
    },
  });

  if (!job) {
    return (
      <View style={styles.notFoundContainer}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.notFoundText}>Job not found</Text>
      </View>
    );
  }

  const handleApply = () => {
    console.log('Apply to job:', job.title);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(isSaved ? 'Unsaved job' : 'Saved job:', job.title);
  };

  const handleShare = () => {
    console.log('Share job:', job.title);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <Text style={styles.jobTitle}>{job.title}</Text>
          <Text style={styles.location}>{job.location}</Text>

          <View style={styles.companySection}>
            <View style={styles.companyLogoSmall}>
              {job.logo ? (
                <Image 
                  source={{ uri: job.logo }} 
                  style={styles.companyLogoImage}
                  resizeMode="cover"
                />
              ) : null}
            </View>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{job.company}</Text>
              {job.department ? (
                <View style={styles.departmentRow}>
                  <Briefcase size={14} color={colors.textSecondary} />
                  <Text style={styles.departmentText}>{job.department}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {job.description ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{job.description}</Text>
          </View>
        ) : null}

        {job.aboutCompany ? (
          <View style={styles.section}>
            {job.aboutCompany.split('\n\n').map((paragraph, index) => (
              <Text key={index} style={[styles.sectionText, styles.paragraph]}>
                {paragraph}
              </Text>
            ))}
          </View>
        ) : null}

        {job.responsibilities && job.responsibilities.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payments Solution</Text>
            {job.responsibilities.map((item, index) => (
              <Text key={index} style={styles.listItem}>
                {item}
              </Text>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {isSaved ? 'Saved' : 'Save'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
