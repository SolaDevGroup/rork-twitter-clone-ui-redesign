import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Download, FileText, Image, Video, MessageCircle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function DownloadArchive() {
  useAuth();
  const { colors } = useTheme();
  const [selectedData, setSelectedData] = useState<string[]>(['all']);

  const dataTypes = [
    { id: 'all', label: 'All data', icon: FileText, description: 'Download everything' },
    { id: 'posts', label: 'Posts', icon: Image, description: 'Your posts and captions' },
    { id: 'videos', label: 'Videos', icon: Video, description: 'Your video content' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, description: 'Your conversations' },
    { id: 'profile', label: 'Profile data', icon: FileText, description: 'Account information' },
  ];

  const toggleDataType = (id: string) => {
    if (id === 'all') {
      setSelectedData(['all']);
    } else {
      const newSelection = selectedData.filter(item => item !== 'all');
      if (newSelection.includes(id)) {
        setSelectedData(newSelection.filter(item => item !== id));
      } else {
        setSelectedData([...newSelection, id]);
      }
    }
  };

  const handleDownload = () => {
    console.log('Requesting data archive:', selectedData);
    Alert.alert(
      'Archive requested',
      'Your data archive will be ready in 24-48 hours. We will send you an email when it is ready to download.',
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Download archive</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Get insights into the type of information stored for your account. Select what you would like to download.
        </Text>

        <View style={styles.dataTypes}>
          {dataTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedData.includes(type.id) || selectedData.includes('all');
            return (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.dataTypeItem,
                  { borderColor: colors.border },
                  isSelected && { borderColor: colors.text, backgroundColor: colors.inputBackground }
                ]}
                onPress={() => toggleDataType(type.id)}
              >
                <Icon size={24} color={colors.text} style={{ opacity: isSelected ? 1 : 0.64 }} />
                <View style={styles.dataTypeContent}>
                  <Text style={[styles.dataTypeLabel, { color: colors.text }]}>{type.label}</Text>
                  <Text style={[styles.dataTypeDescription, { color: colors.textSecondary }]}>
                    {type.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.downloadButton, { backgroundColor: colors.text }]}
          onPress={handleDownload}
        >
          <Download size={20} color={colors.background} />
          <Text style={[styles.downloadButtonText, { color: colors.background }]}>Request archive</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>What to expect:</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            • Archive will be ready in 24-48 hours{'\n'}
            • You will receive an email notification{'\n'}
            • Download link will be valid for 7 days{'\n'}
            • Data will be in JSON format{'\n'}
            • Media files will be included
          </Text>
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
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
  },
  description: {
    fontSize: fontSizes.base,
    lineHeight: 20,
    paddingVertical: spacing.xl,
  },
  dataTypes: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  dataTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderRadius: 12,
    borderWidth: 1,
    gap: spacing.lg,
  },
  dataTypeContent: {
    flex: 1,
  },
  dataTypeLabel: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    marginBottom: spacing.xs,
  },
  dataTypeDescription: {
    fontSize: fontSizes.sm,
  },
  downloadButton: {
    flexDirection: 'row',
    borderRadius: 1000,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  downloadButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
  },
  infoBox: {
    padding: spacing.xl,
    borderRadius: 12,
    marginBottom: spacing.xxl,
  },
  infoTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: fontSizes.sm,
    lineHeight: 20,
  },
});
