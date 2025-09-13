import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Heart, MessageCircle, UserPlus, Repeat2, Trash2 } from 'lucide-react-native';
import { notifications } from '@/mocks/data';
import { Notification } from '@/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Notifications() {
  const insets = useSafeAreaInsets();
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
        <Trash2 size={18} color="#687684" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#0F1419',
  },
  username: {
    fontWeight: '400',
    color: '#687684',
  },
  action: {
    fontSize: 15,
    color: '#687684',
    marginTop: 2,
  },
  postContent: {
    fontSize: 14,
    color: '#0F1419',
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
    backgroundColor: '#F7F9FA',
    borderRadius: 8,
  },
  commentLabel: {
    fontSize: 12,
    color: '#687684',
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: '#0F1419',
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 13,
    color: '#687684',
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
});