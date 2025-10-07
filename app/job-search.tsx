import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { jobRecommendations } from '@/mocks/data';
import { ArrowLeft, Search, MapPin, ArrowUpRight } from 'lucide-react-native';

export default function JobSearch() {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const insets = useSafeAreaInsets();
  const { colors, primary } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingTop: insets.top + 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    inputsContainer: {
      flex: 1,
      gap: 8,
    },
    inputWrapper: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      backgroundColor: colors.inputBackground,
      borderRadius: 8,
      paddingHorizontal: 12,
      height: 44,
      gap: 8,
    },
    input: {
      flex: 1,
      fontSize: fontSizes.md,
      color: colors.text,
      height: 44,
    },
    content: {
      flex: 1,
    },
    sectionTitle: {
      fontSize: fontSizes.sm,
      fontWeight: '600' as const,
      color: colors.textSecondary,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingTop: 20,
      paddingBottom: 12,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
    jobItem: {
      flexDirection: 'row' as const,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
      alignItems: 'center' as const,
    },
    jobContent: {
      flex: 1,
      gap: 4,
    },
    jobTitle: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
    },
    jobCompany: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    jobDetails: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: 8,
      marginTop: 4,
    },
    jobLocation: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
    },
    jobType: {
      fontSize: fontSizes.sm,
      color: primary,
      fontWeight: '500' as const,
    },
    separator: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.textSecondary,
    },
    arrowIcon: {
      opacity: 0.5,
    },
  });

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

        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Search size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Job title"
              placeholderTextColor={colors.textSecondary}
              value={jobTitle}
              onChangeText={setJobTitle}
              autoFocus
            />
          </View>

          <View style={styles.inputWrapper}>
            <MapPin size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Location"
              placeholderTextColor={colors.textSecondary}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>
      </View>

      <FlatList
        style={styles.content}
        data={jobRecommendations}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>Try searching for</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.jobItem}
            onPress={() => {
              console.log('Job selected:', item.title);
            }}
          >
            <View style={styles.jobContent}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.jobCompany}>{item.company}</Text>
              <View style={styles.jobDetails}>
                <Text style={styles.jobLocation}>{item.location}</Text>
                <View style={styles.separator} />
                <Text style={styles.jobType}>{item.type}</Text>
              </View>
            </View>
            <ArrowUpRight 
              size={20} 
              color={colors.textSecondary} 
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
