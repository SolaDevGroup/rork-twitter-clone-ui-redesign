import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import { X, Upload, Youtube } from 'lucide-react-native';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';

export default function UploadVideoScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('Technology');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CATEGORIES = [
    'Technology',
    'Entertainment',
    'Fashion',
    'Music',
    'Gaming',
    'Sports',
    'News',
    'Education',
    'Food',
  ];

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleUpload = async () => {
    if (!youtubeUrl.trim()) {
      Alert.alert('Error', 'Please enter a YouTube URL');
      return;
    }

    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a video title');
      return;
    }

    const videoId = extractYouTubeId(youtubeUrl);
    if (!videoId) {
      Alert.alert('Error', 'Invalid YouTube URL. Please enter a valid YouTube video URL.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Video uploaded successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    }, 1500);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      gap: 12,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: colors.text,
    },
    closeButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    categoryLabel: {
      fontSize: 14,
      fontWeight: '600' as const,
      color: colors.text,
      marginBottom: 8,
    },
    categoriesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    categoryButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    categoryButtonActive: {
      backgroundColor: colors.text,
      borderColor: colors.text,
    },
    categoryText: {
      fontSize: 14,
      fontWeight: '500' as const,
      color: colors.text,
    },
    categoryTextActive: {
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <X size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Video</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <TextInput
            label="YouTube URL *"
            icon={Youtube}
            placeholder="https://youtube.com/watch?v=..."
            value={youtubeUrl}
            onChangeText={setYoutubeUrl}
            autoCapitalize="none"
            autoCorrect={false}
            hint="Paste a YouTube video URL or video ID"
          />
        </View>

        <View style={styles.section}>
          <TextInput
            label="Title *"
            placeholder="Enter video title"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.section}>
          <TextInput
            label="Description"
            placeholder="Enter video description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            style={{ height: 100, textAlignVertical: 'top' }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.categoryLabel}>Category</Text>
          <View style={styles.categoriesContainer}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive,
                ]}
                onPress={() => setCategory(cat)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryText,
                    category === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          title="Upload Video"
          icon={Upload}
          onPress={handleUpload}
          disabled={!youtubeUrl.trim() || !title.trim()}
          loading={isLoading}
          size="large"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
