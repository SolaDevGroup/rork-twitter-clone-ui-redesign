import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react-native';

type TextInputProps = RNTextInputProps & {
  label?: string;
  hint?: string;
  icon?: LucideIcon;
  error?: string;
};

export function TextInput({
  label,
  hint,
  icon: Icon,
  error,
  style,
  ...props
}: TextInputProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 0,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: error ? '#FF3B30' : colors.border,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    hint: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 6,
    },
    error: {
      fontSize: 12,
      color: '#FF3B30',
      marginTop: 6,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {Icon && <Icon size={20} color={colors.textSecondary} style={styles.icon} />}
        <RNTextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textSecondary}
          {...props}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      {hint && !error && <Text style={styles.hint}>{hint}</Text>}
    </View>
  );
}
