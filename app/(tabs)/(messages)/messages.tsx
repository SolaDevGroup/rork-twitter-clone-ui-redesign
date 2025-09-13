import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Search, Briefcase, MessageCircle, Pin, CheckCheck, MoreHorizontal } from 'lucide-react-native';
import { currentUser } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/constants/colors';
import { fonts, fontSizes, spacing, borderRadius } from '@/constants/fonts';

const pinnedConversations = [
  {
    id: 'p1',
    user: {
      name: 'Viktor Sola',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Jam Session',
    lastMessage: 'Heyy, how are you Julian?',
    timestamp: '10:55 PM',
    unreadCount: 12,
    isOnline: true,
    hasDoubleCheck: true,
  },
  {
    id: 'p2',
    user: {
      name: 'Viktor Sola',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Jam Session',
    lastMessage: 'Heyy, how are you Julian?',
    timestamp: '10:55 PM',
    unreadCount: 12,
    isOnline: false,
    hasDoubleCheck: true,
  },
];

const allConversations = [
  {
    id: 'c1',
    user: {
      name: 'Viktor Sola',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Jam Session',
    lastMessage: 'Heyy, how are you Julian?',
    timestamp: '10:55 PM',
    unreadCount: 12,
    isOnline: false,
    hasDoubleCheck: true,
    yourTurn: true,
  },
  {
    id: 'c2',
    user: {
      name: 'Viktor Sola',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Jam Session',
    lastMessage: 'Yes, I love both genres.',
    timestamp: '10:55 PM',
    unreadCount: 12,
    isOnline: true,
    hasDoubleCheck: true,
  },
  {
    id: 'c3',
    user: {
      name: 'Viktor Sola',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Jam Session',
    lastMessage: 'Heyy, how are you Julian?',
    timestamp: '10:55 PM',
    unreadCount: 12,
    isOnline: false,
    hasDoubleCheck: true,
  },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState<'1on1' | 'groups' | 'rooms'>('1on1');
  const insets = useSafeAreaInsets();

  const renderConversationItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => router.push(`/(tabs)/(messages)/${item.id}`)}
      accessible={true}
      accessibilityLabel={`Conversation with ${item.user.name}. Topic: ${item.topic}. Last message: ${item.lastMessage}. ${item.unreadCount} unread messages.`}
      accessibilityRole="button"
    >
      <View style={[styles.avatarContainer, item.isOnline && styles.onlineAvatarContainer]}>
        <Image 
          source={{ uri: item.user.avatar }} 
          style={styles.avatar}
          accessible={true}
          accessibilityLabel={`${item.user.name}'s profile picture`}
        />
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.topRow}>
          <View style={styles.topicContainer}>
            <Text style={styles.topicText}>{item.topic}</Text>
          </View>
          {item.yourTurn && (
            <View style={styles.yourTurnBadge}>
              <Text style={styles.yourTurnText}>Your Turn</Text>
            </View>
          )}
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.leftBottomContent}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>{item.user.name}</Text>
              {item.user.isVerified && (
                <View style={styles.verifiedIcon}>
                  <CheckCheck size={12} color={colors.primary} />
                </View>
              )}
            </View>
            <View style={styles.messageRow}>
              <View style={styles.messageIndicator} />
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
              <View style={styles.messageSeparator} />
              <CheckCheck size={12} color={colors.primary} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingTop: 151 }]}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Pin size={12} color="#FFFFFF" />
            <Text style={styles.sectionTitle}>ALL PINNED</Text>
            <Text style={styles.sectionCount}>4</Text>
          </View>
          <View style={styles.sectionContent}>
            {pinnedConversations.map((item) => (
              <View key={item.id}>
                {renderConversationItem({ item })}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageCircle size={12} color="#FFFFFF" />
            <Text style={styles.sectionTitle}>ALL CONVERSATIONS</Text>
            <Text style={styles.sectionCount}>4</Text>
          </View>
          <View style={styles.sectionContent}>
            {allConversations.map((item) => (
              <View key={item.id}>
                {renderConversationItem({ item })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Header */}
      <View style={[styles.header, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Profile"
              accessibilityRole="button"
              style={styles.profileButton}
            >
              <Image source={{ uri: currentUser.avatar }} style={styles.profileAvatar} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inbox</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.headerIcon}
              accessible={true}
              accessibilityLabel="Search conversations"
              accessibilityRole="button"
            >
              <Search size={24} color={colors.mediumGray} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerIcon}
              accessible={true}
              accessibilityLabel="More options"
              accessibilityRole="button"
            >
              <MoreHorizontal size={24} color={colors.mediumGray} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={styles.briefcaseIcon}
            accessible={true}
            accessibilityLabel="Work conversations"
            accessibilityRole="button"
          >
            <Briefcase size={16} color={colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === '1on1' && styles.activeTab]}
            onPress={() => setActiveTab('1on1')}
            accessible={true}
            accessibilityLabel="One on one conversations"
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === '1on1' }}
          >
            <Text style={[styles.tabText, activeTab === '1on1' && styles.activeTabText]}>1 on 1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
            onPress={() => setActiveTab('groups')}
            accessible={true}
            accessibilityLabel="Group conversations"
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'groups' }}
          >
            <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'rooms' && styles.activeTab]}
            onPress={() => setActiveTab('rooms')}
            accessible={true}
            accessibilityLabel="Room conversations, 36 new"
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === 'rooms' }}
          >
            <Text style={[styles.tabText, activeTab === 'rooms' && styles.activeTabText]}>Rooms</Text>
            <View style={styles.roomsBadge}>
              <Text style={styles.roomsBadgeText}>+36</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.xs,
    paddingBottom: 120,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.black,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    gap: spacing.xl,
    zIndex: 2,
    minHeight: 147,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    flex: 1,
  },
  profileButton: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: fontSizes.xxxl,
    fontFamily: fonts.bold,
    color: colors.white,
    letterSpacing: -0.5,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    height: 44,
  },
  briefcaseIcon: {
    minWidth: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(29, 155, 240, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  tab: {
    paddingHorizontal: spacing.lg,
    height: 44,
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
  },
  activeTab: {
    backgroundColor: colors.white,
  },
  tabText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.medium,
    color: colors.mediumGray,
    textAlign: 'center',
  },
  activeTabText: {
    color: colors.black,
  },
  roomsBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginLeft: spacing.xs,
    minWidth: 24,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomsBadgeText: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.semiBold,
    color: colors.white,
    textAlign: 'center',
  },
  section: {
    backgroundColor: colors.black,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 24,
  },
  sectionTitle: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: colors.mediumGray,
    flex: 1,
  },
  sectionCount: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: colors.white,
  },
  sectionContent: {
    gap: spacing.xl,
    borderRadius: borderRadius.md,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.lg,
    minHeight: 64,
    paddingVertical: spacing.sm,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineAvatarContainer: {
    backgroundColor: colors.green,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  conversationContent: {
    flex: 1,
    gap: spacing.xs,
    justifyContent: 'center',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  topicContainer: {
    backgroundColor: colors.darkGray,
    borderRadius: borderRadius.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.medium,
    color: colors.lightGray,
    textAlign: 'center',
  },
  yourTurnBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourTurnText: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.semiBold,
    color: colors.white,
    textAlign: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  leftBottomContent: {
    flex: 1,
    gap: spacing.xs,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  userName: {
    fontSize: fontSizes.base,
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  verifiedIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
  },
  messageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  lastMessage: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.mediumGray,
    flex: 1,
  },
  messageSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.mediumGray,
  },
  rightColumn: {
    alignItems: 'flex-end',
    gap: spacing.xs,
    justifyContent: 'center',
    minWidth: 60,
  },
  timestamp: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.mediumGray,
    textAlign: 'right',
  },
  unreadBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    minWidth: 20,
    height: 20,
    paddingHorizontal: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.semiBold,
    color: colors.white,
    textAlign: 'center',
  },

});