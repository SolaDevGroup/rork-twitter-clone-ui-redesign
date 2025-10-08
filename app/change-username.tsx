import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function ChangeUsername() {
  const { user } = useAuth();
  const { colors } = useTheme();
  const [username, setUsername] = useState(user?.username || '');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const checkAvailability = () => {
    console.log('Checking username availability:', username);
    setIsAvailable(true);
  };

  const handleSave = () => {
    console.log('Saving new username:', username);
    Alert.alert('Success', 'Username updated successfully');
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Change username</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Your username is how people find and recognize you. Choose a username that represents you.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Username</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor={colors.textSecondary}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {isAvailable !== null && (
            <Text style={[styles.availability, { color: isAvailable ? '#22C55E' : '#EF4444' }]}>
              {isAvailable ? 'Username is available' : 'Username is taken'}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.inputBackground }]}
          onPress={checkAvailability}
        >
          <Text style={[styles.buttonText, { color: colors.text }]}>Check availability</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.text }]}
          onPress={handleSave}
        >
          <Text style={[styles.saveButtonText, { color: colors.background }]}>Save changes</Text>
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Username guidelines:</Text>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            • Must be 3-15 characters long{'\n'}
            • Can only contain letters, numbers, and underscores{'\n'}
            • Cannot start with a number{'\n'}
            • Must be unique
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
  input: {
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    fontSize: 16,
    maxHeight: 56,
  },
  availability: {
    fontSize: fontSizes.sm,
    marginTop: spacing.md,
  },
  button: {
    borderRadius: 1000,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  buttonText: {
    fontSize: fontSizes.md,
    fontWeight: '600' as const,
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
