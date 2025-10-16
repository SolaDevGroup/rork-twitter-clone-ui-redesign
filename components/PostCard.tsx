import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Share as RNShare, Modal, TextInput, Animated, PanResponder } from 'react-native';
import { Icon } from '@/components/Icon';
import { Post } from '@/types';
import { router } from 'expo-router';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowUp, ArrowDown, MessageCircle, Repeat, Bookmark, TrendingUp, VolumeX, Volume2 } from 'lucide-react-native';
import { Video } from 'expo-av';

interface PostCardProps {
  post: Post;
  onComment?: () => void;
  onBookmark?: () => void;
}

export function PostCard({ post, onComment, onBookmark }: PostCardProps) {
  const { collections, addCollection, addToCollection } = useAuth();
  const { colors, primary } = useTheme();
  const [voteCount] = useState(post.likes);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [selectedPollOption, setSelectedPollOption] = useState<string | null>(post.poll?.votedOptionId || null);
  const [pollVotes, setPollVotes] = useState(post.poll?.options || []);
  const [hasVotedPoll, setHasVotedPoll] = useState(post.poll?.hasVoted || false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<Video>(null);

  const translateX = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        translateX.setOffset(0);
      },
      onPanResponderMove: (_, gestureState) => {
        translateX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (_, gestureState) => {
        translateX.flattenOffset();
        
        if (gestureState.dx > 80) {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
          router.push(`/comments?postId=${post.id}`);
        } else if (gestureState.dx < -80) {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
          handleShare();
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            friction: 7,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          friction: 7,
          tension: 40,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      paddingVertical: spacing.lg,
    },
    repostInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.sm,
    },
    repostText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    repostName: {
      fontSize: 12,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    header: {
      flexDirection: 'row',
      marginBottom: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 100,
      marginRight: spacing.md,
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
      marginRight: spacing.xs,
    },
    username: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
    },
    moreButton: {
      padding: spacing.xs,
    },
    content: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    text: {
      fontSize: fontSizes.base,
      fontFamily: fonts.regular,
      color: colors.text,
      lineHeight: 20,
      marginBottom: spacing.sm,
    },
    hashtags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
      marginTop: spacing.xs,
    },
    hashtagButton: {
      backgroundColor: `${primary}0A`,
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: 1000,
    },
    hashtagText: {
      color: primary,
      fontFamily: fonts.medium,
      fontSize: fontSizes.sm,
    },
    postImageContainer: {
      width: '100%',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    postImage: {
      width: '100%',
      aspectRatio: 1.5,
      borderRadius: 12,
    },
    stats: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.sm,
      gap: spacing.lg,
    },
    statItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    statText: {
      fontSize: 13,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
    },
    reactions: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
    },
    reactionAvatars: {
      flexDirection: 'row',
      marginRight: spacing.sm,
    },
    reactionAvatar: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.background,
      marginLeft: -6,
    },
    reactionText: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.text,
    },
    reactionBold: {
      fontFamily: fonts.semiBold,
    },
    commentPreview: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderBottomWidth: 1,
      borderColor: colors.border,
      marginBottom: spacing.sm,
    },
    commentHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.xs,
    },
    commentUser: {
      fontSize: 14,
      fontFamily: fonts.semiBold,
      color: colors.text,
    },
    commentText: {
      fontSize: 14,
      fontFamily: fonts.regular,
      color: colors.text,
    },
    viewComments: {
      fontSize: 13,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginTop: spacing.xs,
    },
    timestamp: {
      fontSize: 12,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      marginTop: spacing.xs,
      paddingHorizontal: spacing.lg,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.xs,
      gap: 4,
    },
    actionText: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
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
    pollContainer: {
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    pollOption: {
      marginBottom: spacing.sm,
      borderRadius: 8,
      overflow: 'hidden' as const,
      position: 'relative' as const,
    },
    pollOptionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderRadius: 8,
      position: 'relative' as const,
    },
    pollOptionSelected: {
      borderWidth: 2,
    },
    pollOptionBar: {
      position: 'absolute' as const,
      left: 0,
      top: 0,
      bottom: 0,
      opacity: 0.15,
    },
    pollOptionContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1,
    },
    pollOptionLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: spacing.sm,
    },
    pollOptionText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.medium,
      color: colors.text,
      flex: 1,
    },
    pollVoteCount: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.semiBold,
      color: colors.textSecondary,
      marginRight: spacing.xs,
    },
    pollPercentage: {
      fontSize: fontSizes.base,
      fontFamily: fonts.semiBold,
      color: colors.text,
    },
    pollVoters: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    pollVoterAvatar: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginLeft: -6,
      borderWidth: 1,
      borderColor: colors.background,
    },
    videoContainer: {
      width: '100%',
      paddingHorizontal: spacing.lg,
      marginBottom: spacing.md,
      position: 'relative' as const,
    },
    video: {
      width: '100%',
      height: 220,
      borderRadius: 12,
      backgroundColor: '#000',
    },
    videoOverlay: {
      position: 'absolute' as const,
      bottom: spacing.md,
      left: spacing.lg,
      right: spacing.lg,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    videoDuration: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.semiBold,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: 4,
    },
    muteButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subtitleBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      paddingHorizontal: spacing.sm,
      paddingVertical: 2,
      borderRadius: 4,
    },
    subtitleText: {
      fontSize: 11,
      fontFamily: fonts.medium,
      color: 'white',
    },
  });

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

  const handleAddToCollection = (collectionId: string) => {
    addToCollection(collectionId, post);
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

  const handlePollVote = (optionId: string) => {
    if (hasVotedPoll) return;
    
    setSelectedPollOption(optionId);
    setHasVotedPoll(true);
    
    const updatedOptions = pollVotes.map(opt => {
      if (opt.id === optionId) {
        return { ...opt, votes: opt.votes + 1 };
      }
      return opt;
    });
    setPollVotes(updatedOptions);
  };

  const getTotalVotes = () => {
    return pollVotes.reduce((sum, opt) => sum + opt.votes, 0);
  };

  const getVotePercentage = (votes: number) => {
    const total = getTotalVotes();
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `+${(num / 1000).toFixed(1)}k`;
    }
    return `+${num}`;
  };

  const handleMoreOptions = () => {
    console.log('More options');
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
      {post.type === 'repost' && (
        <View style={styles.repostInfo}>
          <Repeat size={14} color={colors.textSecondary} />
          <Text style={styles.repostText}>Reposted from</Text>
          <Text style={styles.repostName}>ClubHouse</Text>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push(`/(tabs)/(profile)/${post.user.id}`)}>
          <Image source={{ uri: post.user.avatar ?? 'https://ui-avatars.com/api/?name=User&background=78706B&color=fff&size=200' }} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{post.user.name}</Text>
            {post.user.isVerified && (
              <View style={styles.verified}>
                <Icon name="verified" size={16} color={primary} />
              </View>
            )}
          </View>
          <Text style={styles.username}>@{post.user.username}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton} onPress={handleMoreOptions}>
          <Icon name="more-horiz" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>{post.content}</Text>
        {post.hashtags && post.hashtags.length > 0 && (
          <View style={styles.hashtags}>
            {post.hashtags.map((tag, index) => (
              <TouchableOpacity
                key={`tag-${index}`}
                style={styles.hashtagButton}
                onPress={() => router.push(`/search-results?query=${encodeURIComponent(tag)}`)}
              >
                <Text style={styles.hashtagText}>#{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {post.image && (
        <View style={styles.postImageContainer}>
          <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
        </View>
      )}

      {post.poll && (
        <View style={styles.pollContainer}>
          {pollVotes.map((option) => {
            const percentage = getVotePercentage(option.votes);
            const isSelected = selectedPollOption === option.id;
            const isLeading = option.votes === Math.max(...pollVotes.map(o => o.votes));
            
            return (
              <View key={option.id} style={styles.pollOption}>
                <TouchableOpacity
                  style={[
                    styles.pollOptionButton,
                    { borderColor: hasVotedPoll ? (isLeading ? primary : colors.border) : colors.border },
                    isSelected && hasVotedPoll && styles.pollOptionSelected,
                  ]}
                  onPress={() => handlePollVote(option.id)}
                  disabled={hasVotedPoll}
                  activeOpacity={0.7}
                >
                  {hasVotedPoll && (
                    <View style={[
                      styles.pollOptionBar,
                      { backgroundColor: isLeading ? primary : colors.textSecondary, width: `${percentage}%` }
                    ]} />
                  )}
                  <View style={styles.pollOptionContent}>
                    <View style={styles.pollOptionLeft}>
                      <Text style={styles.pollOptionText}>{option.text}</Text>
                      {hasVotedPoll && isLeading && option.voters && option.voters.length > 0 && (
                        <View style={styles.pollVoters}>
                          {option.voters.slice(0, 3).map((voter, idx) => (
                            <Image
                              key={voter.id}
                              source={{ uri: voter.avatar }}
                              style={[styles.pollVoterAvatar, idx === 0 && { marginLeft: 0 }]}
                            />
                          ))}
                        </View>
                      )}
                    </View>
                    {hasVotedPoll && (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        {option.votes > 0 && (
                          <Text style={styles.pollVoteCount}>{formatNumber(option.votes)}</Text>
                        )}
                        <Text style={styles.pollPercentage}>{percentage}%</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}

      {post.video && (
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: post.video.url }}
            style={styles.video}
            useNativeControls={false}
            resizeMode={'cover' as any}
            isLooping
            isMuted={isMuted}
            shouldPlay={false}
          />
          <View style={styles.videoOverlay}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
              <Text style={styles.videoDuration}>{post.video.duration}</Text>
              {post.video.hasSubtitles && (
                <View style={styles.subtitleBadge}>
                  <Icon name="closed-caption" size={12} color="white" />
                  <Text style={styles.subtitleText}>These are auto-generated subtitles</Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.muteButton}
              onPress={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <VolumeX size={16} color="white" />
              ) : (
                <Volume2 size={16} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.stats}>
        <TouchableOpacity style={styles.statItem}>
          <ArrowUp size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>{voteCount}k</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <ArrowDown size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>{voteCount}k</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <MessageCircle size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>1.5M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <Repeat size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>1.5M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <TrendingUp size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>1.5M</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statItem}>
          <Bookmark size={16} color={colors.textSecondary} />
          <Text style={styles.statText}>1.5M</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.reactions}>
        <View style={styles.reactionAvatars}>
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=Webflow&background=4353FF&color=fff&size=40' }} 
            style={[styles.reactionAvatar, { marginLeft: 0 }]} 
          />
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=User1&background=22C55E&color=fff&size=40' }} 
            style={styles.reactionAvatar} 
          />
          <Image 
            source={{ uri: 'https://ui-avatars.com/api/?name=User2&background=EF4444&color=fff&size=40' }} 
            style={styles.reactionAvatar} 
          />
        </View>
        <Text style={styles.reactionText}>
          <Text style={styles.reactionBold}>Webflow & 2 friends</Text> reacted to this post
        </Text>
      </View>

      <TouchableOpacity style={styles.commentPreview} onPress={onComment}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUser}>User</Text>
          <Icon name="favorite" size={16} color={colors.textSecondary} />
        </View>
        <Text style={styles.commentText}>With the most liked comment</Text>
        <Text style={styles.viewComments}>View all {post.comments} comments</Text>
      </TouchableOpacity>

      <Text style={styles.timestamp}>{post.timestamp}</Text>
      
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
