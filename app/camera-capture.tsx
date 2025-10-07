import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  Alert,
  PanResponder,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions, CameraMode } from 'expo-camera';
import { IconButton } from '@/components/IconButton';
import { useTheme } from '@/contexts/ThemeContext';


export default function CameraCaptureScreen() {
  const { primary } = useTheme();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [cameraMode] = useState<CameraMode>('picture');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startRecording();
      },
      onPanResponderRelease: () => {
        if (isRecording) {
          stopRecording();
        } else {
          takePicture();
        }
      },
    })
  ).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    camera: {
      flex: 1,
    },
    cameraControls: {
      flex: 1,
      justifyContent: 'space-between',
    },
    cameraHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    cameraFooter: {
      alignItems: 'center',
      paddingBottom: 40,
    },
    captureButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 4,
      borderColor: 'white',
    },
    captureButtonInner: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: 'white',
    },
    captureButtonRecording: {
      width: 40,
      height: 40,
      borderRadius: 8,
      backgroundColor: '#EF4444',
    },
    recordingIndicator: {
      position: 'absolute' as const,
      top: 80,
      alignSelf: 'center',
      backgroundColor: 'rgba(239, 68, 68, 0.9)',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    recordingDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: 'white',
    },
    recordingText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600' as const,
    },
    previewContainer: {
      flex: 1,
    },
    previewImage: {
      flex: 1,
    },
    previewControls: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
    },
    previewHeader: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    previewFooter: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 40,
      paddingBottom: 40,
    },
    previewAction: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 32,
      paddingVertical: 14,
      borderRadius: 30,
      minWidth: 120,
      alignItems: 'center',
    },
    confirmButton: {
      backgroundColor: primary,
    },
    previewActionText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600' as const,
    },
    instructionText: {
      position: 'absolute' as const,
      bottom: 140,
      alignSelf: 'center',
      color: 'white',
      fontSize: 14,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
  });

  if (!permission) {
    return <View style={styles.container} />;
  }

  const takePicture = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCapturedMedia(photo.uri);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture');
      }
    }
  };

  const startRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not supported', 'Video recording is not supported on web');
      return;
    }

    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        console.log('Recording started');
        
        recordingTimerRef.current = setTimeout(() => {
          stopRecording();
        }, 60000);
      } catch (error) {
        console.error('Error starting recording:', error);
        setIsRecording(false);
        Alert.alert('Error', 'Failed to start recording');
      }
    }
  };

  const stopRecording = async () => {
    if (recordingTimerRef.current) {
      clearTimeout(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }
    
    setIsRecording(false);
    console.log('Recording stopped');
    
    Alert.alert('Video Recording', 'Video recording feature will be available soon', [
      { text: 'OK' }
    ]);
  };



  const confirmMedia = () => {
    if (capturedMedia) {
      router.push({
        pathname: '/create-post',
        params: { imageUri: capturedMedia }
      });
    }
  };

  const retakeMedia = () => {
    setCapturedMedia(null);
  };

  const closeCamera = () => {
    if (isRecording) {
      stopRecording();
    }
    router.back();
  };

  if (capturedMedia) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: capturedMedia }} style={styles.previewImage} />
        <SafeAreaView style={styles.previewControls}>
          <View style={styles.previewHeader}>
            <IconButton 
              icon="close"
              size={40}
              onPress={closeCamera}
              backgroundType="blur"
              testID="close-preview-button"
            />
          </View>
          <View style={styles.previewFooter}>
            <TouchableOpacity onPress={retakeMedia} style={styles.previewAction}>
              <Text style={styles.previewActionText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmMedia} style={[styles.previewAction, styles.confirmButton]}>
              <Text style={styles.previewActionText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraType}
        mode={cameraMode}
      >
        <SafeAreaView style={styles.cameraControls}>
          <View style={styles.cameraHeader}>
            <IconButton 
              icon="close"
              size={48}
              onPress={closeCamera}
              backgroundType="blur"
              testID="close-camera-button"
            />
            <IconButton 
              icon="flip-camera-ios"
              size={48}
              onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
              backgroundType="blur"
              testID="flip-camera-button"
            />
          </View>

          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>Recording...</Text>
            </View>
          )}

          <View style={styles.cameraFooter}>
            <Text style={styles.instructionText}>
              Tap to capture • Hold to record
            </Text>
            <View {...panResponder.panHandlers}>
              <TouchableOpacity 
                style={styles.captureButton}
                activeOpacity={0.8}
              >
                <View style={isRecording ? styles.captureButtonRecording : styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}
