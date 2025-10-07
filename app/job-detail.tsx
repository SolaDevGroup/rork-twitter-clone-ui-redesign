import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { jobListings } from '@/mocks/data';
import { ArrowLeft, Share2, Briefcase, MapPin, GraduationCap, Clock, Languages, Code } from 'lucide-react-native';

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
    bulletPoint: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      lineHeight: 24,
      marginBottom: 8,
      paddingLeft: 16,
    },
    infoRow: {
      flexDirection: 'row' as const,
      alignItems: 'flex-start' as const,
      gap: 12,
      marginBottom: 16,
    },
    infoIcon: {
      marginTop: 2,
    },
    infoContent: {
      flex: 1,
    },
    infoLabel: {
      fontSize: fontSizes.sm,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 4,
    },
    infoText: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      lineHeight: 22,
    },
    skillsContainer: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      gap: 8,
      marginTop: 8,
    },
    skillChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    skillText: {
      fontSize: fontSizes.sm,
      color: colors.text,
      fontWeight: '500' as const,
    },
    mapContainer: {
      width: '100%',
      height: 200,
      borderRadius: 12,
      overflow: 'hidden' as const,
      backgroundColor: colors.surface,
      marginTop: 8,
    },
    mapPlaceholder: {
      width: '100%',
      height: '100%',
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    mapPlaceholderText: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginTop: 8,
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
            <Text style={styles.sectionTitle}>Job Description</Text>
            <Text style={styles.sectionText}>{job.description}</Text>
          </View>
        ) : null}

        {(job.degreeRequired || job.experienceYears || job.requiredLanguages || job.requiredSkills) ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            
            {job.degreeRequired ? (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <GraduationCap size={20} color={colors.text} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Education</Text>
                  <Text style={styles.infoText}>{job.degreeRequired}</Text>
                </View>
              </View>
            ) : null}

            {job.experienceYears ? (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Clock size={20} color={colors.text} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Experience</Text>
                  <Text style={styles.infoText}>{job.experienceYears}</Text>
                </View>
              </View>
            ) : null}

            {job.requiredLanguages && job.requiredLanguages.length > 0 ? (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Languages size={20} color={colors.text} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Languages</Text>
                  <Text style={styles.infoText}>{job.requiredLanguages.join(', ')}</Text>
                </View>
              </View>
            ) : null}

            {job.requiredSkills && job.requiredSkills.length > 0 ? (
              <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                  <Code size={20} color={colors.text} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Required Skills</Text>
                  <View style={styles.skillsContainer}>
                    {job.requiredSkills.map((skill, index) => (
                      <View key={index} style={styles.skillChip}>
                        <Text style={styles.skillText}>{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        {job.responsibilities && job.responsibilities.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Responsibilities</Text>
            {job.responsibilities.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}
          </View>
        ) : null}

        {job.benefits && job.benefits.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Benefits</Text>
            {job.benefits.map((item, index) => (
              <Text key={index} style={styles.bulletPoint}>
                • {item}
              </Text>
            ))}
          </View>
        ) : null}

        {job.aboutCompany ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About {job.company}</Text>
            {job.aboutCompany.split('\n\n').map((paragraph, index) => (
              <Text key={index} style={[styles.sectionText, styles.paragraph]}>
                {paragraph}
              </Text>
            ))}
          </View>
        ) : null}

        {job.workLocation ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Location</Text>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MapPin size={20} color={colors.text} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{job.workLocation.address}</Text>
              </View>
            </View>
            <View style={styles.mapContainer}>
              <View style={styles.mapPlaceholder}>
                <MapPin size={32} color={colors.textSecondary} />
                <Text style={styles.mapPlaceholderText}>Map View</Text>
                <Text style={styles.mapPlaceholderText}>
                  {job.workLocation.latitude.toFixed(4)}, {job.workLocation.longitude.toFixed(4)}
                </Text>
              </View>
            </View>
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
