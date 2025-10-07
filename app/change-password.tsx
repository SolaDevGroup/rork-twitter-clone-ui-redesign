import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function ChangePassword() {
  useAuth();
  const { colors } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }
    console.log('Changing password');
    Alert.alert('Success', 'Password updated successfully');
    router.back();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Change password</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Change your password at any time. Make sure to use a strong password that you don&apos;t use anywhere else.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Current password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showCurrent}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowCurrent(!showCurrent)}
            >
              {showCurrent ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>New password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showNew}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowNew(!showNew)}
            >
              {showNew ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Confirm new password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!showConfirm}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.text }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.background }]}>Save changes</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Password requirements:</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            • At least 8 characters long{'\n'}
            • Include uppercase and lowercase letters{'\n'}
            • Include at least one number{'\n'}
            • Include at least one special character
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
  inputContainer: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: fontSizes.sm,
    marginBottom: spacing.md,
  },
  passwordContainer: {
    position: 'relative',
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    maxHeight: 56,
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: spacing.lg,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  saveButton: {
    borderRadius: 1000,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  saveButtonText: {
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
