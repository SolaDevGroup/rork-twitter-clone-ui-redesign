import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { posts, comments as mockComments, currentUser } from '@/mocks/data';
import { PostCard } from '@/components/PostCard';

export default function CommentsModal() {
  const { postId } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  const post = posts.find(p => p.id === postId);
  const postComments = mockComments.filter(c => c.postId === postId);

  const handleReply = () => {
    if (comment.trim()) {
      console.log('Replying:', comment);
      setComment('');
    }
  };

  if (!post) return null;

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.closeButton}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Comments</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.content}>
        <PostCard post={post} />
        
        {postComments.map(comment => (
          <View key={comment.id} style={styles.commentItem}>
            <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
            <View style={styles.commentContent}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentName}>{comment.user.name}</Text>
                <Text style={styles.commentUsername}>@{comment.user.username}</Text>
                <Text style={styles.dot}>·</Text>
                <Text style={styles.commentTime}>{comment.timestamp}</Text>
              </View>
              <Text style={styles.commentText}>{comment.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.replyContainer}>
        <Image source={{ uri: currentUser.avatar }} style={styles.replyAvatar} />
        <TextInput
          style={styles.replyInput}
          placeholder="Write a comment..."
          placeholderTextColor="#687684"
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  closeButton: {
    fontSize: 16,
    color: '#1DA1F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F1419',
  },
  content: {
    flex: 1,
  },
  commentItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
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
    color: '#0F1419',
    marginRight: 4,
  },
  commentUsername: {
    fontSize: 15,
    color: '#687684',
    marginRight: 4,
  },
  dot: {
    color: '#687684',
    marginRight: 4,
  },
  commentTime: {
    fontSize: 15,
    color: '#687684',
  },
  commentText: {
    fontSize: 15,
    color: '#0F1419',
    lineHeight: 20,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F3F4',
  },
  replyAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  replyInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F1419',
    maxHeight: 100,
  },
  replyButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginLeft: 12,
  },
  replyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});