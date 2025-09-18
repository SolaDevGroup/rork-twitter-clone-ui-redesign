import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, UserPlus, Repeat2, Trash2 } from 'lucide-react-native';
import { notifications } from '@/mocks/data';
import { Notification } from '@/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { fontSizes } from '@/constants/fonts';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const renderIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart size={20} color="#F91880" fill="#F91880" />;
      case 'comment':
        return <MessageCircle size={20} color="#1DA1F2" fill="#1DA1F2" />;
      case 'follow':
        return <UserPlus size={20} color="#1DA1F2" />;
      case 'repost':
        return <Repeat2 size={20} color="#00BA7C" />;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={styles.iconContainer}>{renderIcon(item.type)}</View>
      <View style={styles.notificationContent}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
          <View style={styles.textContent}>
            <Text style={styles.userName}>
              {item.user.name}{' '}
              <Text style={styles.username}>@{item.user.username}</Text>
            </Text>
            <Text style={styles.action}>
              {item.type === 'like' && 'liked your post'}
              {item.type === 'comment' && 'commented on your post'}
              {item.type === 'follow' && 'followed you'}
              {item.type === 'repost' && 'reposted your post'}
            </Text>
            {item.post && (
              <>
                <Text style={styles.postContent} numberOfLines={2}>
                  {item.post.content}
                </Text>
                {item.post.image && (
                  <Image source={{ uri: item.post.image }} style={styles.postImage} />
                )}
              </>
            )}
            {item.comment && (
              <View style={styles.commentContainer}>
                <Text style={styles.commentLabel}>Comment:</Text>
                <Text style={styles.commentText}>&quot;{item.comment}&quot;</Text>
              </View>
            )}
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Trash2 size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    notificationItem: {
      flexDirection: 'row',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconContainer: {
      marginRight: 12,
      marginTop: 4,
    },
    notificationContent: {
      flex: 1,
    },
    userInfo: {
      flexDirection: 'row',
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 16,
      marginRight: 8,
    },
    textContent: {
      flex: 1,
    },
    userName: {
      fontSize: fontSizes.md,
      fontWeight: '600' as const,
      color: colors.text,
    },
    username: {
      fontWeight: '400' as const,
      color: colors.textSecondary,
    },
    action: {
      fontSize: fontSizes.md,
      color: colors.textSecondary,
      marginTop: 2,
    },
    postContent: {
      fontSize: fontSizes.sm,
      color: colors.text,
      marginTop: 8,
      lineHeight: 18,
    },
    postImage: {
      width: '100%',
      height: 150,
      borderRadius: 12,
      marginTop: 8,
    },
    commentContainer: {
      marginTop: 8,
      padding: 8,
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
    },
    commentLabel: {
      fontSize: fontSizes.xs,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    commentText: {
      fontSize: fontSizes.sm,
      color: colors.text,
      fontStyle: 'italic',
    },
    timestamp: {
      fontSize: fontSizes.sm,
      color: colors.textSecondary,
      marginTop: 4,
    },
    deleteButton: {
      padding: 4,
    },
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
      />
    </View>
  );
}