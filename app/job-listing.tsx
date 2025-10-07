import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { jobListings } from '@/mocks/data';
import { ArrowLeft, Search, ChevronRight, CheckCircle } from 'lucide-react-native';
import type { Job } from '@/types';

export default function JobListing() {
  const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search');
  const [searchQuery, setSearchQuery] = useState('Software Engineer • Netherlands');
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingTop: insets.top + 12,
      paddingBottom: 12,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTop: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 16,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    headerTitle: {
      fontSize: fontSizes.xl,
      fontWeight: '700' as const,
      color: colors.text,
      flex: 1,
      textAlign: 'center' as const,
    },
    placeholder: {
      width: 40,
    },
    tabContainer: {
      flexDirection: 'row' as const,
      marginBottom: 16,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center' as const,
    },
    tabText: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.textSecondary,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#0A66C2',
    },
    activeTabText: {
      color: colors.text,
    },
    searchContainer: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 44,
      gap: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: fontSizes.md,
      color: colors.text,
      height: 44,
    },
    content: {
      flex: 1,
    },
    jobItem: {
      flexDirection: 'row' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
      alignItems: 'flex-start' as const,
    },
    logoContainer: {
      width: 48,
      height: 48,
      borderRadius: 8,
      overflow: 'hidden' as const,
      backgroundColor: colors.surface,
    },
    logo: {
      width: 48,
      height: 48,
    },
    jobContent: {
      flex: 1,
      gap: 4,
    },
    jobTitle: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
      lineHeight: 20,
    },
    companyRow: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 4,
      marginTop: 2,
    },
    jobCompany: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    companyHandle: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    jobLocation: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginTop: 2,
    },
    jobSalary: {
      fontSize: fontSizes.sm,
      color: colors.text,
      fontWeight: '500' as const,
      marginTop: 4,
    },
    arrowIcon: {
      marginTop: 4,
    },
  });

  const renderJobItem = ({ item }: { item: Job }) => (
    <TouchableOpacity 
      style={styles.jobItem}
      onPress={() => {
        console.log('Job selected:', item.title);
      }}
    >
      <View style={styles.logoContainer}>
        {item.logo ? (
          <Image 
            source={{ uri: item.logo }} 
            style={styles.logo}
            resizeMode="cover"
          />
        ) : null}
      </View>

      <View style={styles.jobContent}>
        <Text style={styles.jobTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.companyRow}>
          <Text style={styles.jobCompany}>{item.company}</Text>
          {item.isVerified ? (
            <CheckCircle size={14} color="#0A66C2" fill="#0A66C2" />
          ) : null}
          {item.companyHandle ? (
            <Text style={styles.companyHandle}>{item.companyHandle}</Text>
          ) : null}
        </View>

        <Text style={styles.jobLocation} numberOfLines={1}>
          {item.location}
        </Text>

        {item.salary ? (
          <Text style={styles.jobSalary}>{item.salary}</Text>
        ) : null}
      </View>

      <ChevronRight 
        size={20} 
        color={colors.textSecondary} 
        style={styles.arrowIcon}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.text} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Jobs</Text>

          <View style={styles.placeholder} />
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'search' && styles.activeTab]}
            onPress={() => setActiveTab('search')}
          >
            <Text style={[styles.tabText, activeTab === 'search' && styles.activeTabText]}>
              Search
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'saved' && styles.activeTab]}
            onPress={() => setActiveTab('saved')}
          >
            <Text style={[styles.tabText, activeTab === 'saved' && styles.activeTabText]}>
              Saved
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search jobs..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        style={styles.content}
        data={jobListings}
        keyExtractor={(item) => item.id}
        renderItem={renderJobItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
