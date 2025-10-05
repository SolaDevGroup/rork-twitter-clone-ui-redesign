import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Icon } from '@/components/Icon';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';

export default function CameraPreview() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { colors, primary } = useTheme();
  const imageUri = params.imageUri as string;
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRetake = () => {
    router.back();
  };

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      // Here you would normally upload the image or process it
      // For now, we'll just navigate to create post with the image
      router.replace({
        pathname: '/create-post',
        params: { imageUri },
      });
    } catch (error) {
      console.error('Error processing image:', error);
      if (Platform.OS === 'web') {
        console.log('Error processing image');
      } else {
        Alert.alert('Error', 'Failed to process image');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Discard this photo?')) {
        router.back();
      }
    } else {
      Alert.alert(
        'Discard Photo',
        'Are you sure you want to discard this photo?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Discard', onPress: () => router.back(), style: 'destructive' },
        ],
        { cancelable: true }
      );
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    closeButton: {
      padding: spacing.md,
    },
    headerTitle: {
      fontSize: fontSizes.lg,
      fontFamily: fonts.semiBold,
      color: '#FFFFFF',
    },
    placeholder: {
      width: 40,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    controls: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: spacing.xxxl,
      paddingVertical: spacing.xl,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    retakeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.xl,
      borderWidth: 1,
      borderColor: '#FFFFFF',
    },
    retakeText: {
      color: '#FFFFFF',
      fontSize: fontSizes.md,
      fontFamily: fonts.medium,
      marginLeft: spacing.md,
    },
    confirmButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.xl,
    },
    confirmButtonDisabled: {
      opacity: 0.5,
    },
    confirmText: {
      color: '#000000',
      fontSize: fontSizes.md,
      fontFamily: fonts.semiBold,
      marginLeft: spacing.md,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xxxl,
    },
    errorText: {
      color: '#FFFFFF',
      fontSize: fontSizes.lg,
      fontFamily: fonts.regular,
      marginTop: spacing.lg,
      marginBottom: spacing.xl,
    },
    backButton: {
      backgroundColor: primary,
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.lg,
      borderRadius: borderRadius.xl,
    },
    backButtonText: {
      color: '#FFFFFF',
      fontSize: fontSizes.md,
      fontFamily: fonts.semiBold,
    },
  });

  if (!imageUri) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="error-outline" size={48} color={colors.textSecondary} />
          <Text style={styles.errorText}>No image to preview</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Icon name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preview</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.retakeButton} 
          onPress={handleRetake}
          disabled={isProcessing}
        >
          <Icon name="refresh" size={24} color="#FFFFFF" />
          <Text style={styles.retakeText}>Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.confirmButton, isProcessing && styles.confirmButtonDisabled]} 
          onPress={handleConfirm}
          disabled={isProcessing}
        >
          <Icon name="check" size={24} color="#000000" />
          <Text style={styles.confirmText}>
            {isProcessing ? 'Processing...' : 'Use Photo'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}