import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share as RNShare, Platform, Modal, TextInput, Animated, PanResponder } from 'react-native';
import { Icon } from '@/components/Icon';
import { Post } from '@/types';
import { router } from 'expo-router';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface PostCardProps {
  post: Post;
  onComment?: () => void;
  onBookmark?: () => void;
}

export function PostCard({ post, onComment, onBookmark }: PostCardProps) {
  const { collections, addCollection, addToCollection } = useAuth();
  const { colors, primary } = useTheme();
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(post.likes);
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

  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0 && gestureState.dx < 100) {
          translateX.setValue(gestureState.dx);
        } else if (gestureState.dx < 0 && gestureState.dx > -100) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50) {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          router.push(`/comments?postId=${post.id}`);
        } else if (gestureState.dx < -50) {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          handleShare();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingVertical: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    header: {
      flexDirection: 'row',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    avatar: {
      width: 32,
      height: 32,
      borderRadius: 100,
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
      color: colors.text,
      marginRight: spacing.xs,
    },
    verified: {
      color: primary,
      fontSize: fontSizes.base,
      marginRight: spacing.xs,
    },
    username: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginRight: spacing.xs,
    },
    dot: {
      color: colors.textSecondary,
      marginRight: spacing.xs,
    },
    timestamp: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
    },
    bio: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginTop: 2,
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 2,
    },
    locationText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginLeft: spacing.xs,
    },
    moreButton: {
      padding: spacing.xs,
    },
    content: {
      marginTop: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    text: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.text,
      lineHeight: 20,
      marginBottom: spacing.md,
    },
    mention: {
      color: primary,
      fontFamily: fonts.medium,
    },
    hashtag: {
      color: primary,
      fontFamily: fonts.medium,
    },
    hashtagButton: {
      backgroundColor: `${primary}0A`,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: 1000,
      marginRight: 4,
    },
    hashtagButtonPressed: {
      backgroundColor: `${primary}1A`,
    },
    postImageContainer: {
      width: '100%',
      aspectRatio: 1,
      marginTop: spacing.md,
      paddingHorizontal: 6,
    },
    postImage: {
      width: '100%',
      height: '100%',
      borderRadius: 12,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
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
      marginLeft: spacing.sm,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: colors.background,
      borderTopLeftRadius: borderRadius.xl,
      borderTopRightRadius: borderRadius.xl,
      padding: spacing.xl,
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: fontSizes.lg,
      fontFamily: fonts.semiBold,
      color: colors.text,
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
      color: colors.text,
    },
    collectionCount: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
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
      color: primary,
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
      borderRadius: 12,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      backgroundColor: colors.inputBackground,
      color: colors.text,
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
      color: colors.textSecondary,
    },
    createButton: {
      backgroundColor: primary,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: 12,
    },
    createButtonText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.medium,
      color: 'white',
    },
    modalCloseButton: {
      alignItems: 'center',
      paddingVertical: spacing.lg,
      marginTop: spacing.lg,
    },
    modalCloseText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
  });

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setVoteCount(voteCount - 1);
    } else {
      setUpvoted(true);
      if (downvoted) {
        setDownvoted(false);
        setVoteCount(voteCount + 2);
      } else {
        setVoteCount(voteCount + 1);
      }
    }
  };

  const handleDownvote = () => {
    if (downvoted) {
      setDownvoted(false);
      setVoteCount(voteCount + 1);
    } else {
      setDownvoted(true);
      if (upvoted) {
        setUpvoted(false);
        setVoteCount(voteCount - 2);
      } else {
        setVoteCount(voteCount - 1);
      }
    }
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
      setBookmarked(!bookmarked);
      setBookmarkCount(bookmarked ? bookmarkCount - 1 : bookmarkCount + 1);
      onBookmark?.();
    } else {
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
    console.log('More options');
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      console.log('Translation response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response text:', text);
        throw new Error('Invalid JSON response from translation API');
      }

      if (data.completion) {
        setTranslatedText(data.completion);
        setShowTranslation(true);
      } else {
        throw new Error('No completion in response');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateX }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push(`/(tabs)/(profile)/${post.user.id}`)}>
          <Image source={{ uri: post.user.avatar ?? 'https://ui-avatars.com/api/?name=User&background=78706B&color=fff&size=200' }} style={styles.avatar} />
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
          {post.location && (
            <View style={styles.locationContainer}>
              <Icon name="location-on" size={14} color={colors.textSecondary} />
              <Text style={styles.locationText}>{post.location}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={handleMoreOptions}>
          <Icon name="more-horiz" size={20} color={colors.textSecondary} />
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
                    key={`mention-${index}-${word}`}
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
                  <React.Fragment key={`hashtag-${index}-${word}`}>
                    <TouchableOpacity
                      style={styles.hashtagButton}
                      onPress={() => {
                        router.push(`/search-results?query=${encodeURIComponent(word.substring(1))}`);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.hashtag}>
                        #{word.substring(1)}
                      </Text>
                    </TouchableOpacity>
                    <Text> </Text>
                  </React.Fragment>
                );
              }
              return word + ' ';
            })}
        </Text>

        <TouchableOpacity onPress={handleTranslate} style={styles.translateButton}>
          <Icon name="translate" size={16} color={primary} />
          <Text style={[styles.translateText, { color: primary }]}>
            {isTranslating ? 'Translating...' : showTranslation ? 'Show original' : 'Translate post'}
          </Text>
        </TouchableOpacity>
      </View>

      {post.image && (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
        </View>
      )}

      <View style={styles.actions}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.actionButton} onPress={handleUpvote}>
            <Icon 
              name="arrow-upward" 
              size={24} 
              color={upvoted ? '#22C55E' : colors.textSecondary} 
            />
          </TouchableOpacity>
          <Text style={[styles.actionText, { color: colors.textSecondary, marginHorizontal: 4 }, upvoted && { color: '#22C55E' }, downvoted && { color: '#EF4444' }]}>
            {voteCount}
          </Text>
          <TouchableOpacity style={styles.actionButton} onPress={handleDownvote}>
            <Icon 
              name="arrow-downward" 
              size={24} 
              color={downvoted ? '#EF4444' : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.actionButton} onPress={onComment}>
          <Icon name="chat-bubble-outline" size={24} color={colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }]}>{post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleRepost}>
          <Icon name="repeat" size={24} color={reposted ? '#22C55E' : colors.textSecondary} />
          <Text style={[styles.actionText, { color: colors.textSecondary }, reposted && { color: '#22C55E' }]}>
            {repostCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleBookmark}>
          <Icon 
            name={bookmarked ? "bookmark" : "bookmark-border"} 
            size={24} 
            color={bookmarked ? primary : colors.textSecondary} 
          />
          <Text style={[styles.actionText, { color: colors.textSecondary }, bookmarked && { color: primary }]}>
            {bookmarkCount}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Icon name="share" size={24} color={colors.textSecondary} />
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
                  placeholderTextColor={colors.textSecondary}
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
                <Icon name="add" size={20} color={primary} />
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
    </Animated.View>
  );
}