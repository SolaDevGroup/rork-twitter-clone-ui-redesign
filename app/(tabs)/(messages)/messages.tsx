import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Search, Briefcase, MessageCircle, Pin, CheckCheck, MoreVertical } from 'lucide-react-native';
import { currentUser } from '@/mocks/data';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
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
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Vocalist',
    lastMessage: 'I can do the session tomorrow',
    timestamp: '9:30 PM',
    unreadCount: 3,
    isOnline: false,
    hasDoubleCheck: true,
  },
];

const allConversations = [
  {
    id: 'c1',
    user: {
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
    },
    topic: 'Looking for Drummer',
    lastMessage: 'What style do you usually play?',
    timestamp: '8:45 PM',
    unreadCount: 2,
    isOnline: false,
    hasDoubleCheck: true,
    yourTurn: true,
  },
  {
    id: 'c2',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isVerified: false,
    },
    topic: 'Studio Recording',
    lastMessage: 'The studio is booked for Friday',
    timestamp: '7:20 PM',
    unreadCount: 0,
    isOnline: true,
    hasDoubleCheck: true,
  },
];

export default function Messages() {
  const [activeTab, setActiveTab] = useState<'1on1' | 'groups' | 'rooms'>('1on1');
  const insets = useSafeAreaInsets();
  const { colors, primary, success } = useTheme();

  const renderConversationItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => router.push(`/(tabs)/(messages)/${item.id}`)}
    >
      <View style={[styles.avatarContainer, item.isOnline && { backgroundColor: success }]}>
        <Image 
          source={{ uri: item.user.avatar }} 
          style={styles.avatar}
        />
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.topRow}>
          <View style={styles.topicContainer}>
            <Text style={styles.topicText}>{item.topic}</Text>
          </View>
          {item.yourTurn && (
            <View style={[styles.yourTurnBadge, { backgroundColor: primary }]}>
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
                  <CheckCheck size={12} color={primary} />
                </View>
              )}
            </View>
            <View style={styles.messageRow}>
              <View style={[styles.messageIndicator, { backgroundColor: primary }]} />
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
              <View style={styles.messageSeparator} />
              <CheckCheck size={12} color={primary} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {item.unreadCount > 0 && (
          <View style={[styles.unreadBadge, { backgroundColor: primary }]}>
            <Text style={styles.unreadCount}>{item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
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
      backgroundColor: colors.background,
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
      color: colors.text,
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
      backgroundColor: colors.inputBackground,
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
      backgroundColor: colors.inputBackground,
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
      backgroundColor: colors.text,
    },
    tabText: {
      fontSize: fontSizes.base,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    activeTabText: {
      color: colors.background,
    },
    roomsBadge: {
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
      color: colors.text,
      textAlign: 'center',
    },
    section: {
      backgroundColor: colors.background,
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
      color: colors.textSecondary,
      flex: 1,
    },
    sectionCount: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.medium,
      color: colors.text,
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
      backgroundColor: colors.inputBackground,
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
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
      backgroundColor: colors.inputBackground,
      borderRadius: borderRadius.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topicText: {
      fontSize: fontSizes.xs,
      fontFamily: fonts.medium,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    yourTurnBadge: {
      borderRadius: borderRadius.lg,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      justifyContent: 'center',
      alignItems: 'center',
    },
    yourTurnText: {
      fontSize: fontSizes.xs,
      fontFamily: fonts.semiBold,
      color: colors.background,
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
      color: colors.text,
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
    },
    lastMessage: {
      fontSize: fontSizes.sm,
      fontFamily: fonts.regular,
      color: colors.textSecondary,
      flex: 1,
    },
    messageSeparator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: colors.textSecondary,
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
      color: colors.textSecondary,
      textAlign: 'right',
    },
    unreadBadge: {
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
      color: colors.background,
      textAlign: 'center',
    },

  });

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
            <Pin size={12} color={colors.textSecondary} />
            <Text style={styles.sectionTitle}>ALL PINNED</Text>
            <Text style={styles.sectionCount}>{pinnedConversations.length}</Text>
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
            <MessageCircle size={12} color={colors.textSecondary} />
            <Text style={styles.sectionTitle}>ALL CONVERSATIONS</Text>
            <Text style={styles.sectionCount}>{allConversations.length}</Text>
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
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.profileButton}>
              <Image source={{ uri: currentUser.avatar }} style={styles.profileAvatar} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inbox</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Search size={24} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <MoreVertical size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.briefcaseIcon}>
            <Briefcase size={16} color={primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === '1on1' && styles.activeTab]}
            onPress={() => setActiveTab('1on1')}
          >
            <Text style={[styles.tabText, activeTab === '1on1' && styles.activeTabText]}>1 on 1</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
            onPress={() => setActiveTab('groups')}
          >
            <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>Groups</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'rooms' && styles.activeTab]}
            onPress={() => setActiveTab('rooms')}
          >
            <Text style={[styles.tabText, activeTab === 'rooms' && styles.activeTabText]}>Rooms</Text>
            <View style={[styles.roomsBadge, { backgroundColor: primary }]}>
              <Text style={styles.roomsBadgeText}>+36</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>


    </View>
  );
}