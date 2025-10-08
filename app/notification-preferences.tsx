import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { fontSizes, spacing } from '@/constants/fonts';

export default function NotificationPreferences() {
  const { colors, primary } = useTheme();
  const [likes, setLikes] = React.useState(true);
  const [comments, setComments] = React.useState(true);
  const [follows, setFollows] = React.useState(true);
  const [mentions, setMentions] = React.useState(true);
  const [messages, setMessages] = React.useState(true);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { backgroundColor: colors.inputBackground }]}>
          <ArrowLeft size={24} color={colors.text} style={{ opacity: 0.64 }} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Preferences</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionDescription, { color: colors.textSecondary }]}>
          Select your preferences by notification type.
        </Text>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Likes</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Get notified when someone likes your posts.
            </Text>
          </View>
          <Switch
            value={likes}
            onValueChange={setLikes}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Comments</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Get notified when someone comments on your posts.
            </Text>
          </View>
          <Switch
            value={comments}
            onValueChange={setComments}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>New followers</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Get notified when someone follows you.
            </Text>
          </View>
          <Switch
            value={follows}
            onValueChange={setFollows}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Mentions</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Get notified when someone mentions you.
            </Text>
          </View>
          <Switch
            value={mentions}
            onValueChange={setMentions}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
        </View>

        <View style={styles.toggleItem}>
          <View style={styles.toggleContent}>
            <Text style={[styles.toggleTitle, { color: colors.text }]}>Direct messages</Text>
            <Text style={[styles.toggleDescription, { color: colors.textSecondary }]}>
              Get notified when you receive a direct message.
            </Text>
          </View>
          <Switch
            value={messages}
            onValueChange={setMessages}
            trackColor={{ false: colors.border, true: primary }}
            thumbColor={colors.text}
          />
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
  },
  sectionDescription: {
    fontSize: fontSizes.base,
    lineHeight: 20,
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
  },
  toggleContent: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: fontSizes.md,
    fontWeight: '500' as const,
    marginBottom: spacing.xs,
  },
  toggleDescription: {
    fontSize: fontSizes.sm,
    lineHeight: 16,
  },
});
