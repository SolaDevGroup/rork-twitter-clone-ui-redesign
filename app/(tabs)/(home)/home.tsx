import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { Send, Plus } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { posts, currentUser } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const [newPost, setNewPost] = useState('');
  const insets = useSafeAreaInsets();

  const handlePost = () => {
    if (newPost.trim()) {
      console.log('Posting:', newPost);
      setNewPost('');
    }
  };

  const handleComment = (postId: string) => {
    router.push({
      pathname: '/comments',
      params: { postId },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg' }} 
          style={styles.logo} 
        />
        <Text style={styles.headerTitle}>Home</Text>
        <TouchableOpacity>
          <Send size={24} color="#1DA1F2" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.composeContainer}>
            <Image source={{ uri: currentUser.avatar }} style={styles.composeAvatar} />
            <TextInput
              style={styles.composeInput}
              placeholder="What's happening?"
              placeholderTextColor="#687684"
              value={newPost}
              onChangeText={setNewPost}
              multiline
            />
            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <PostCard post={item} onComment={() => handleComment(item.id)} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/create-post')}
        activeOpacity={0.8}
      >
        <Plus size={24} color="white" />
      </TouchableOpacity>
    </View>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  logo: {
    width: 30,
    height: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F1419',
  },
  composeContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
    alignItems: 'flex-start',
  },
  composeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  composeInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F1419',
    paddingTop: 4,
    minHeight: 48,
  },
  postButton: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    marginLeft: 12,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    height: 0,
  },
});