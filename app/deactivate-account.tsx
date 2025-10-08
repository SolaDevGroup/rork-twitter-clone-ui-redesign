import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function DeactivateAccount() {
  useAuth();
  const { colors } = useTheme();
  const [reason, setReason] = useState('');
  const [password, setPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const reasons = [
    'Taking a break',
    'Privacy concerns',
    'Too many notifications',
    'Found another platform',
    'Other',
  ];

  const handleDeactivate = () => {
    if (!reason) {
      Alert.alert('Error', 'Please select a reason');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }
    if (!confirmed) {
      Alert.alert('Error', 'Please confirm you understand the consequences');
      return;
    }

    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? This action can be reversed within 30 days.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: () => {
            console.log('Deactivating account');
            Alert.alert('Account Deactivated', 'Your account has been deactivated.');
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Deactivate account</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.warningBox, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
          <AlertTriangle size={24} color="#EF4444" />
          <View style={styles.warningContent}>
            <Text style={[styles.warningTitle, { color: '#EF4444' }]}>Warning</Text>
            <Text style={[styles.warningText, { color: colors.textSecondary }]}>
              Deactivating your account will hide your profile and content. You can reactivate within 30 days.
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Why are you leaving?</Text>
        <View style={styles.reasonsContainer}>
          {reasons.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.reasonItem,
                { borderColor: colors.border },
                reason === item && { borderColor: colors.text, backgroundColor: colors.inputBackground }
              ]}
              onPress={() => setReason(item)}
            >
              <Text style={[styles.reasonText, { color: colors.text }]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Confirm your password</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor={colors.textSecondary}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setConfirmed(!confirmed)}
        >
          <View style={[
            styles.checkbox,
            { borderColor: colors.border },
            confirmed && { backgroundColor: colors.text, borderColor: colors.text }
          ]}>
            {confirmed && <Text style={[styles.checkmark, { color: colors.background }]}>✓</Text>}
          </View>
          <Text style={[styles.checkboxLabel, { color: colors.text }]}>
            I understand that my account will be deactivated and I can reactivate it within 30 days
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.deactivateButton, { backgroundColor: '#EF4444' }]}
          onPress={handleDeactivate}
        >
          <Text style={styles.deactivateButtonText}>Deactivate account</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>What happens when you deactivate:</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            • Your profile will be hidden{'\n'}
            • Your posts will not be visible{'\n'}
            • People will not be able to find you{'\n'}
            • You can reactivate within 30 days{'\n'}
            • After 30 days, your account will be permanently deleted
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
    </>
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
  warningBox: {
    flexDirection: 'row',
    padding: spacing.xl,
    borderRadius: 12,
    gap: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  warningContent: {
    flex: 1,
  },
  warningTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    marginBottom: spacing.xs,
  },
  warningText: {
    fontSize: fontSizes.sm,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    marginBottom: spacing.lg,
  },
  reasonsContainer: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  reasonItem: {
    padding: spacing.xl,
    borderRadius: 12,
    borderWidth: 1,
  },
  reasonText: {
    fontSize: fontSizes.md,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    maxHeight: 56,
    marginBottom: spacing.xxl,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: fontSizes.sm,
    lineHeight: 20,
  },
  deactivateButton: {
    borderRadius: 1000,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  deactivateButtonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
    color: '#FFFFFF',
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
