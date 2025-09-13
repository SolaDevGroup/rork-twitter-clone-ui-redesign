import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Share as RNShare, Platform, Modal, TextInput } from 'react-native';
import { Icon } from '@/components/Icon';
import { Post } from '@/types';
import { router } from 'expo-router';
import { colors } from '@/constants/colors';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import { useAuth } from '@/contexts/AuthContext';

interface PostCardProps {
  post: Post;
  onComment?: () => void;
  onBookmark?: () => void;
}

export function PostCard({ post, onComment, onBookmark }: PostCardProps) {
  const { collections, addCollection, addToCollection } = useAuth();
  const [liked, setLiked] = useState(post.isLiked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [reposted, setReposted] = useState(post.isReposted || false);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const [bookmarked, setBookmarked] = useState(post.isBookmarked || false);
  const [bookmarkCount, setBookmarkCount] = useState(post.bookmarks || 0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleRepost = () => {
    setReposted(!reposted);
    setRepostCount(reposted ? repostCount - 1 : repostCount + 1);
  };

  const handleShare = async () => {
    try {
      await RNShare.share({
        message: `${post.user.name} (@${post.user.username}): ${post.content}`,
        url: post.image,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBookmark = () => {
    if (Platform.OS === 'web') {
      // Simple bookmark for web
      setBookmarked(!bookmarked);
      setBookmarkCount(bookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
      onBookmark?.();
    } else {
      // Show collection modal for native
      setShowCollectionModal(true);
    }
  };

  const handleAddToCollection = (collectionId: string) => {
    addToCollection(collectionId, post);
    setBookmarked(true);
    setBookmarkCount(bookmarkCount + 1);
    setShowCollectionModal(false);
    onBookmark?.();
  };

  const handleCreateCollection = () => {
    if (newCollectionName.trim()) {
      addCollection(newCollectionName.trim(), false);
      setNewCollectionName('');
      setIsCreatingCollection(false);
    }
  };

  const handleMoreOptions = () => {
    if (Platform.OS === 'web') {
      Alert.alert('Options', 'More options coming soon');
    } else {
      Alert.alert(
        'Post Options',
        '',
        [
          { text: 'Copy link to post', onPress: () => console.log('Copy link') },
          { text: 'Share post via...', onPress: handleShare },
          { text: bookmarked ? 'Remove bookmark' : 'Bookmark', onPress: handleBookmark },
          { text: 'Not interested in this', onPress: () => console.log('Not interested') },
          { text: 'Report post', onPress: () => console.log('Report'), style: 'destructive' },
          { text: 'Cancel', style: 'cancel' },
        ],
        { cancelable: true }
      );
    }
  };

  const handleTranslate = async () => {
    if (showTranslation) {
      setShowTranslation(false);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a translator. Translate the following text to English. Only respond with the translation, nothing else.'
            },
            {
              role: 'user',
              content: post.content
            }
          ]
        }),
      });

      const data = await response.json();
      setTranslatedText(data.completion);
      setShowTranslation(true);
    } catch (error) {
      console.error('Translation error:', error);
      Alert.alert('Translation failed', 'Could not translate this post');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push(`/(tabs)/(profile)/${post.user.id}`)}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{post.user.name}</Text>
            {post.user.isVerified && <Text style={styles.verified}>✓</Text>}
            <Text style={styles.username}>@{post.user.username}</Text>
            <Text style={styles.dot}>·</Text>
            <Text style={styles.timestamp}>{post.timestamp}</Text>
          </View>
          {post.user.bio && <Text style={styles.bio}>{post.user.bio}</Text>}
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={() => handleMoreOptions()}>
          <Icon name="more-horiz" size={20} color={colors.darkGray} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          {(showTranslation ? translatedText : post.content)
            .split(' ')
            .map((word, index) => {
              if (word.startsWith('@')) {
                return (
                  <Text
                    key={index}
                    style={styles.mention}
                    onPress={() => {
                      const username = word.substring(1);
                      router.push(`/(tabs)/(profile)/${username}`);
                    }}
                  >
                    {word}{' '}
                  </Text>
                );
              } else if (word.startsWith('#')) {
                return (
                  <Text
                    key={index}
                    style={styles.hashtag}
                    onPress={() => {
                      router.push(`/search-results?query=${word.substring(1)}`);
                    }}
                  >
                    {word.substring(1)}{' '}
                  </Text>
                );
              }
              return word + ' ';
            })}
        </Text>
        
        {post.location && (
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={14} color={colors.darkGray} />
            <Text style={styles.locationText}>{post.location}</Text>
          </View>
        )}

        <TouchableOpacity onPress={handleTranslate} style={styles.translateButton}>
          <Icon name="translate" size={16} color={colors.primary} />
          <Text style={styles.translateText}>
            {isTranslating ? 'Translating...' : showTranslation ? 'Show original' : 'Translate post'}
          </Text>
        </TouchableOpacity>

        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Icon name="chat-bubble-outline" size={18} color={colors.darkGray} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleRepost}>
          <Icon name="repeat" size={20} color={reposted ? colors.green : colors.darkGray} />
          <Text style={[styles.actionText, reposted && styles.reposted]}>
            {repostCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Icon 
            name={liked ? "favorite" : "favorite-border"} 
            size={18} 
            color={liked ? colors.red : colors.darkGray} 
          />
          <Text style={[styles.actionText, liked && styles.liked]}>
            {likeCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
          <Icon 
            name={bookmarked ? "bookmark" : "bookmark-border"} 
            size={18} 
            color={bookmarked ? colors.primary : colors.darkGray} 
          />
          <Text style={[styles.actionText, bookmarked && styles.bookmarked]}>
            {bookmarkCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="share" size={18} color={colors.darkGray} />
        </TouchableOpacity>
      </View>
      
      <Modal
        visible={showCollectionModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCollectionModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Save to Collection</Text>
            
            {collections.map(collection => (
              <TouchableOpacity
                key={collection.id}
                style={styles.collectionItem}
                onPress={() => handleAddToCollection(collection.id)}
              >
                <Text style={styles.collectionName}>{collection.name}</Text>
                <Text style={styles.collectionCount}>{collection.posts.length} posts</Text>
              </TouchableOpacity>
            ))}
            
            {isCreatingCollection ? (
              <View style={styles.createCollectionForm}>
                <TextInput
                  style={styles.collectionInput}
                  placeholder="Collection name"
                  placeholderTextColor={colors.darkGray}
                  value={newCollectionName}
                  onChangeText={setNewCollectionName}
                  autoFocus
                />
                <View style={styles.createCollectionButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setIsCreatingCollection(false);
                      setNewCollectionName('');
                    }}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.createButton}
                    onPress={handleCreateCollection}
                  >
                    <Text style={styles.createButtonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.createCollectionButton}
                onPress={() => setIsCreatingCollection(true)}
              >
                <Icon name="add" size={20} color={colors.primary} />
                <Text style={styles.createCollectionText}>Create new collection</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowCollectionModal(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: spacing.lg,
  },
  headerContent: {
    flex: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: fontSizes.base,
    fontFamily: fonts.semiBold,
    color: colors.black,
    marginRight: spacing.xs,
  },
  verified: {
    color: colors.verified,
    fontSize: fontSizes.base,
    marginRight: spacing.xs,
  },
  username: {
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    marginRight: spacing.xs,
  },
  dot: {
    color: colors.darkGray,
    marginRight: spacing.xs,
  },
  timestamp: {
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    color: colors.darkGray,
  },
  bio: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    marginTop: 2,
  },
  moreButton: {
    padding: spacing.xs,
  },
  content: {
    marginLeft: 60,
  },
  text: {
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    color: colors.black,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  mention: {
    color: colors.primary,
    fontFamily: fonts.medium,
  },
  hashtag: {
    color: colors.primary,
    fontFamily: fonts.medium,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    marginLeft: 52,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  actionText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    marginLeft: spacing.xs,
  },
  liked: {
    color: colors.red,
  },
  reposted: {
    color: colors.green,
  },
  bookmarked: {
    color: colors.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  locationText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    marginLeft: spacing.xs,
  },
  translateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  translateText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.primary,
    marginLeft: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.modalBackground,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.xl,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fonts.semiBold,
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  collectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  collectionName: {
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
    color: colors.black,
  },
  collectionCount: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.darkGray,
  },
  createCollectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  createCollectionText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
    color: colors.primary,
    marginLeft: spacing.md,
  },
  createCollectionForm: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  collectionInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    marginBottom: spacing.lg,
  },
  createCollectionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.lg,
  },
  cancelButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  cancelButtonText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
    color: colors.darkGray,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  createButtonText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  modalCloseButton: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  modalCloseText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
    color: colors.darkGray,
  },
});