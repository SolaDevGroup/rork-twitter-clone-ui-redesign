import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react-native';
import { PostCard } from '@/components/PostCard';
import { users, posts } from '@/mocks/data';
import { router, useLocalSearchParams } from 'expo-router';

export default function UserProfileScreen() {
  const { profileId } = useLocalSearchParams();
  const user = users.find(u => u.id === profileId);
  const userPosts = posts.filter(post => post.user.id === profileId);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#0F1419" />
        </TouchableOpacity>
        <Text style={styles.topHeaderTitle}>{user.name}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.header}>
          <Image 
            source={{ uri: user.coverImage || 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800' }} 
            style={styles.coverImage} 
          />
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            {user.isVerified && <Text style={styles.verified}>✓</Text>}
          </View>
          <Text style={styles.username}>@{user.username}</Text>
          <Text style={styles.bio}>{user.bio}</Text>

          <View style={styles.details}>
            <View style={styles.detailItem}>
              <MapPin size={16} color="#687684" />
              <Text style={styles.detailText}>{user.location}</Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color="#687684" />
              <Text style={styles.detailText}>Joined {user.joinedDate}</Text>
            </View>
          </View>

          <View style={styles.stats}>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.postsSection}>
          <Text style={styles.postsHeader}>{userPosts.length} Posts</Text>
          {userPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
  topHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F1419',
  },
  header: {
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: 150,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginTop: -30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
  },
  followButton: {
    backgroundColor: '#0F1419',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  profileInfo: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F1419',
    marginRight: 4,
  },
  verified: {
    color: '#1DA1F2',
    fontSize: 18,
  },
  username: {
    fontSize: 15,
    color: '#687684',
    marginTop: 2,
  },
  bio: {
    fontSize: 15,
    color: '#0F1419',
    marginTop: 12,
  },
  details: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#687684',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    gap: 4,
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0F1419',
  },
  statLabel: {
    fontSize: 15,
    color: '#687684',
  },
  postsSection: {
    borderTopWidth: 1,
    borderTopColor: '#F0F3F4',
  },
  postsHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F1419',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F3F4',
  },
});