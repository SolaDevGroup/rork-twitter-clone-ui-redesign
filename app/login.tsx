import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/Icon';
import { IconButton } from '@/components/IconButton';
import { fontSizes } from '@/constants/fonts';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const { colors, primary } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingVertical: 12,
    },

    placeholder: {
      width: 40,
    },
    content: {
      flex: 1,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
      paddingTop: 20,
    },
    title: {
      fontSize: fontSizes.xxxl,
      fontWeight: '700' as const,
      color: colors.text,
    },
    titleWrapper: {
      marginBottom: 32,
    },
    inputContainer: {
      position: 'relative' as const,
    },
    inputsWrapper: {
      gap: 20,
    },
    input: {
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 16,
      fontSize: 16,
      color: colors.text,
    },
    eyeIcon: {
      position: 'absolute',
      right: 12,
      top: 18,
    },
    forgotPassword: {
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: primary,
      fontSize: fontSizes.sm,
    },
    loginButton: {
      backgroundColor: primary,
      borderRadius: 24,
      paddingVertical: 12,
      alignItems: 'center',
      marginBottom: 20,
    },
    loginButtonDisabled: {
      backgroundColor: colors.textSecondary,
      opacity: 0.5,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: 16,
      color: colors.textSecondary,
      fontSize: fontSizes.sm,
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.inputBackground,
      borderRadius: 24,
      paddingVertical: 12,
      marginBottom: 12,
    },
    socialButtonText: {
      marginLeft: 8,
      fontSize: fontSizes.md,
      fontWeight: '500' as const,
      color: colors.text,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    },
    footerText: {
      color: colors.textSecondary,
      fontSize: fontSizes.sm,
    },
    signUpText: {
      color: primary,
      fontSize: fontSizes.sm,
      fontWeight: '600' as const,
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    login();
    
    router.replace('/(tabs)/(search)/search');
  };

  const handleForgotPassword = () => {
    Alert.alert('Password Reset', 'A password reset link has been sent to your email');
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Sign up functionality coming soon');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <IconButton 
              icon="close"
              size={40}
              onPress={() => router.back()}
              backgroundType="solid"
              testID="close-button"
            />
            <Icon name="flutter-dash" size={32} color={primary} />
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Log in to X</Text>
            </View>

            <View style={styles.inputsWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone, email, or username"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={colors.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon 
                    name={showPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color={colors.textSecondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, (!email || !password) && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={!email || !password}
            >
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <Icon name="g-mobiledata" size={24} color={colors.text} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Icon name="apple" size={24} color={colors.text} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{"Don't have an account? "}</Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

