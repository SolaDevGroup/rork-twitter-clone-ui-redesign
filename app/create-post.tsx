import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Icon } from '@/components/Icon';
import { fontSizes } from '@/constants/fonts';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';

interface PollOption {
  id: string;
  text: string;
}

export default function CreatePost() {
  const { user } = useAuth();
  const { colors, primary } = useTheme();
  const params = useLocalSearchParams();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>((params.imageUri as string) || null);
  const [audience, setAudience] = useState('Everyone');
  const [location, setLocation] = useState('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);
  const [pollDuration, setPollDuration] = useState({ days: 1, hours: 0, minutes: 0 });
  const [showCamera, setShowCamera] = useState(false);
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const maxLength = 280;
  const remainingChars = maxLength - content.length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardView: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    cancelText: {
      fontSize: 16,
      color: colors.text,
    },
    postButton: {
      backgroundColor: primary,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    postButtonDisabled: {
      backgroundColor: colors.textSecondary,
    },
    postButtonText: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '600',
    },
    postButtonTextDisabled: {
      opacity: 0.5,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
    },
    audienceSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      marginTop: 8,
    },
    audienceText: {
      color: primary,
      fontSize: 14,
      marginRight: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      marginTop: 12,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 24,
      marginRight: 12,
    },
    textInput: {
      flex: 1,
      fontSize: 18,
      color: colors.text,
      paddingTop: 4,
      minHeight: 100,
    },
    imagePreview: {
      marginTop: 16,
      marginLeft: 60,
      borderRadius: 16,
      overflow: 'hidden',
    },
    selectedImage: {
      width: '100%',
      height: 200,
      borderRadius: 16,
    },
    removeImage: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      borderRadius: 15,
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pollContainer: {
      marginLeft: 60,
      marginTop: 16,
    },
    pollOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    pollInput: {
      flex: 1,
      backgroundColor: colors.inputBackground,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text,
    },
    pollCharCount: {
      color: colors.textSecondary,
      fontSize: 13,
      marginHorizontal: 8,
    },
    addOption: {
      paddingVertical: 8,
    },
    pollDuration: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      marginTop: 8,
    },
    pollDurationLabel: {
      color: colors.text,
      fontSize: 15,
      marginRight: 8,
    },
    pollDurationValue: {
      color: colors.textSecondary,
      fontSize: 15,
      flex: 1,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 60,
      marginTop: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    locationInput: {
      flex: 1,
      marginLeft: 8,
      fontSize: 15,
      color: colors.text,
    },
    replySettings: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      marginLeft: 60,
    },
    replyText: {
      color: primary,
      fontSize: 14,
      marginLeft: 8,
    },
    toolbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    toolbarLeft: {
      flexDirection: 'row',
    },
    toolButton: {
      marginRight: 20,
    },
    charCount: {
      color: colors.textSecondary,
      fontSize: 14,
    },
    charCountWarning: {
      color: '#EF4444',
    },
    cameraContainer: {
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
    cameraButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 25,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraFooter: {
      alignItems: 'center',
      paddingBottom: 40,
    },
    captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    captureButtonInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: 'white',
    },
    previewContainer: {
      flex: 1,
    },
    previewImage: {
      flex: 1,
    },
    previewControls: {
      position: 'absolute',
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
    previewButton: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    previewFooter: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 40,
      paddingBottom: 40,
    },
    previewAction: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 25,
    },
    confirmButton: {
      backgroundColor: primary,
    },
    previewActionText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    if (Platform.OS === 'web') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } else {
      if (!permission?.granted) {
        const { granted } = await requestPermission();
        if (!granted) {
          Alert.alert('Permission needed', 'Camera permission is required to take photos');
          return;
        }
      }
      setShowCamera(true);
    }
  };

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to add location');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      if (address) {
        const locationString = `${address.city || address.district || ''}, ${address.region || address.country || ''}`;
        setLocation(locationString.replace(/, ,/g, ',').replace(/^, |, $/g, ''));
        setShowLocationInput(true);
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Could not get your location');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCapturedImage(photo.uri);
          setShowPreview(true);
        }
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const confirmPicture = () => {
    if (capturedImage) {
      setSelectedImage(capturedImage);
    }
    setShowCamera(false);
    setShowPreview(false);
    setCapturedImage(null);
  };

  const retakePicture = () => {
    setShowPreview(false);
    setCapturedImage(null);
  };

  const closeCamera = () => {
    setShowCamera(false);
    setShowPreview(false);
    setCapturedImage(null);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([
        ...pollOptions,
        { id: Date.now().toString(), text: '' },
      ]);
    }
  };

  const removePollOption = (id: string) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter(option => option.id !== id));
    }
  };

  const updatePollOption = (id: string, text: string) => {
    setPollOptions(pollOptions.map(option => 
      option.id === id ? { ...option, text } : option
    ));
  };

  const handlePost = () => {
    console.log('Posting:', {
      content,
      image: selectedImage,
      location,
      audience,
      poll: showPoll ? { question: pollQuestion, options: pollOptions, duration: pollDuration } : null,
    });
    router.back();
  };

  const canPost = content.trim().length > 0 || selectedImage;

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        {!showPreview ? (
          <>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing={cameraType}
            >
              <SafeAreaView style={styles.cameraControls}>
                <View style={styles.cameraHeader}>
                  <TouchableOpacity onPress={closeCamera} style={styles.cameraButton}>
                    <Icon name="close" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setCameraType(cameraType === 'back' ? 'front' : 'back')}
                    style={styles.cameraButton}
                  >
                    <Icon name="flip-camera-ios" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.cameraFooter}>
                  <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                    <View style={styles.captureButtonInner} />
                  </TouchableOpacity>
                </View>
              </SafeAreaView>
            </CameraView>
          </>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedImage! }} style={styles.previewImage} />
            <SafeAreaView style={styles.previewControls}>
              <View style={styles.previewHeader}>
                <TouchableOpacity onPress={closeCamera} style={styles.previewButton}>
                  <Icon name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <View style={styles.previewFooter}>
                <TouchableOpacity onPress={retakePicture} style={styles.previewAction}>
                  <Text style={styles.previewActionText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmPicture} style={[styles.previewAction, styles.confirmButton]}>
                  <Text style={styles.previewActionText}>Use Photo</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.postButton, !canPost && styles.postButtonDisabled]}
            onPress={handlePost}
            disabled={!canPost}
          >
            <Text style={[styles.postButtonText, !canPost && styles.postButtonTextDisabled]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.audienceSelector}>
            <Text style={styles.audienceText}>{audience}</Text>
            <Icon name="keyboard-arrow-down" size={16} color={primary} />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <TextInput
              style={styles.textInput}
              placeholder={showPoll ? "Ask a question..." : "What's happening?"}
              placeholderTextColor={colors.textSecondary}
              multiline
              value={showPoll ? pollQuestion : content}
              onChangeText={showPoll ? setPollQuestion : setContent}
              maxLength={maxLength}
            />
          </View>

          {selectedImage && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity
                style={styles.removeImage}
                onPress={() => setSelectedImage(null)}
              >
                <Icon name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}

          {showPoll && (
            <View style={styles.pollContainer}>
              {pollOptions.map((option, index) => (
                <View key={option.id} style={styles.pollOption}>
                  <TextInput
                    style={styles.pollInput}
                    placeholder={`Choice ${index + 1}`}
                    placeholderTextColor={colors.textSecondary}
                    value={option.text}
                    onChangeText={(text) => updatePollOption(option.id, text)}
                    maxLength={25}
                  />
                  <Text style={styles.pollCharCount}>{25 - option.text.length}</Text>
                  {pollOptions.length > 2 && (
                    <TouchableOpacity onPress={() => removePollOption(option.id)}>
                      <Icon name="close" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {pollOptions.length < 4 && (
                <TouchableOpacity onPress={addPollOption} style={styles.addOption}>
                  <Icon name="add" size={20} color={primary} />
                </TouchableOpacity>
              )}
              <View style={styles.pollDuration}>
                <Text style={styles.pollDurationLabel}>Poll length</Text>
                <Text style={styles.pollDurationValue}>
                  {pollDuration.days} day{pollDuration.days !== 1 ? 's' : ''}
                </Text>
                <Icon name="keyboard-arrow-down" size={16} color={colors.textSecondary} />
              </View>
            </View>
          )}

          {showLocationInput && (
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={20} color={primary} />
              <TextInput
                style={styles.locationInput}
                placeholder="Add location"
                placeholderTextColor={colors.textSecondary}
                value={location}
                onChangeText={setLocation}
              />
              {location && (
                <TouchableOpacity onPress={() => {
                  setLocation('');
                  setShowLocationInput(false);
                }}>
                  <Icon name="close" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles.replySettings}>
            <Icon name="public" size={20} color={primary} />
            <Text style={styles.replyText}>Everyone can reply</Text>
          </View>
        </ScrollView>

        <View style={styles.toolbar}>
          <View style={styles.toolbarLeft}>
            <TouchableOpacity onPress={openCamera} style={styles.toolButton}>
              <Icon name="photo-camera" size={24} color={primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.toolButton}>
              <Icon name="image" size={24} color={primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowPoll(!showPoll);
                if (!showPoll) {
                  setSelectedImage(null);
                }
              }}
              style={styles.toolButton}
            >
              <Icon name="poll" size={24} color={showPoll ? primary : colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!showLocationInput) {
                  getCurrentLocation();
                } else {
                  setShowLocationInput(false);
                  setLocation('');
                }
              }}
              style={styles.toolButton}
              disabled={isGettingLocation}
            >
              <Icon 
                name="location-on" 
                size={24} 
                color={showLocationInput || isGettingLocation ? primary : colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
          {!showPoll && (
            <Text style={[styles.charCount, remainingChars < 20 && styles.charCountWarning]}>
              {remainingChars}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}