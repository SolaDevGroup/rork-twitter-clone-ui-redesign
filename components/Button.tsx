import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react-native';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'outline';

type ButtonProps = {
  title: string;
  onPress: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  testID?: string;
};

export function Button({
  title,
  onPress,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  loading = false,
  icon: Icon,
  testID,
}: ButtonProps) {
  const { colors } = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
          iconSize: 16,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          fontSize: 18,
          iconSize: 24,
        };
      case 'medium':
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          fontSize: 16,
          iconSize: 20,
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: colors.surface,
          textColor: colors.text,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          textColor: colors.text,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'primary':
      default:
        return {
          backgroundColor: colors.text,
          textColor: colors.background,
          borderWidth: 0,
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      backgroundColor: variantStyles.backgroundColor,
      borderWidth: variantStyles.borderWidth,
      borderColor: variantStyles.borderColor,
      gap: 8,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    text: {
      fontSize: sizeStyles.fontSize,
      fontWeight: '600' as const,
      color: variantStyles.textColor,
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button, (disabled || loading) && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={variantStyles.textColor} />
      ) : (
        <>
          {Icon && <Icon size={sizeStyles.iconSize} color={variantStyles.textColor} />}
          <Text style={styles.text}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
