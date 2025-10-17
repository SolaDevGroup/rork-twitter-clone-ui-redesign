import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { safeGoBack } from '@/utils/navigation';
import { posts, comments as mockComments, currentUser } from '@/mocks/data';
import { PostCard } from '@/components/PostCard';
import { SCREEN_HORIZONTAL_PADDING } from '@/constants/layout';
import { useTheme } from '@/contexts/ThemeContext';

export default function CommentsModal() {
  const { postId } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const post = posts.find(p => p.id === postId);
  const postComments = mockComments.filter(c => c.postId === postId);
  const { colors: themeColors } = useTheme();

  const handleReply = () => {
    if (comment.trim()) {
      console.log('Replying:', comment);
      setComment('');
    }
  };

  if (!post) return null;

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: themeColors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
        <TouchableOpacity onPress={() => safeGoBack()}>
          <Text style={[styles.closeButton, { color: '#D4AF37' }]}>Close</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: themeColors.text }]}>Comments</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <PostCard post={post} />
        
        {postComments.map(comment => (
          <View key={comment.id} style={[styles.commentItem, { borderBottomColor: themeColors.border }]}>
            <Image source={{ uri: comment.user.avatar ?? 'https://ui-avatars.com/api/?name=User&background=78706B&color=fff&size=200' }} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={[styles.commentName, { color: themeColors.text }]}>{comment.user.name}</Text>
                <Text style={[styles.commentUsername, { color: themeColors.textSecondary }]}>@{comment.user.username}</Text>
                <Text style={[styles.dot, { color: themeColors.textSecondary }]}>·</Text>
                <Text style={[styles.commentTime, { color: themeColors.textSecondary }]}>{comment.timestamp}</Text>
              </View>
              <Text style={[styles.commentText, { color: themeColors.text }]}>{comment.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={[styles.replyContainer, { borderTopColor: themeColors.border }]}>
        <Image source={{ uri: currentUser.avatar ?? 'https://ui-avatars.com/api/?name=User&background=78706B&color=fff&size=200' }} style={styles.replyAvatar} />
        <TextInput
          style={[styles.replyInput, { color: themeColors.text }]}
          placeholder="Write a comment..."
          placeholderTextColor={themeColors.textSecondary}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity style={styles.replyButton} onPress={handleReply}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    padding: SCREEN_HORIZONTAL_PADDING,
    borderBottomWidth: 1,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentName: {
    fontSize: 15,
    fontWeight: '600',
    marginRight: 4,
  },
  commentUsername: {
    fontSize: 15,
    marginRight: 4,
  },
  dot: {
    marginRight: 4,
  },
  commentTime: {
    fontSize: 15,
  },
  commentText: {
    fontSize: 15,
    lineHeight: 20,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SCREEN_HORIZONTAL_PADDING,
    borderTopWidth: 1,
  },
  replyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  replyInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  replyButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 1000,
    marginLeft: 12,
  },
  replyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});