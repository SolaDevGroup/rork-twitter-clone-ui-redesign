import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { Search, Camera, Briefcase, MessageCircle, Pin, CheckCheck, MoreHorizontal } from 'lucide-react-native';
import { currentUser } from '@/mocks/data';
import { router } from 'expo-router';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    >
      <View style={[styles.avatarContainer, item.isOnline && styles.onlineAvatarContainer]}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
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
                  <CheckCheck size={12} color="rgba(255, 255, 255, 0.48)" />
                </View>
              )}
            </View>
            <View style={styles.messageRow}>
              <View style={styles.messageIndicator} />
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
              <View style={styles.messageSeparator} />
              <CheckCheck size={12} color="#FFFFFF" />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>{item.unreadCount}</Text>
        </View>
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
      <View style={[styles.header, { paddingTop: insets.top + 52 }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity>
              <Image source={{ uri: currentUser.avatar }} style={styles.profileAvatar} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Inbox</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIcon}>
              <Search size={24} color="rgba(255, 255, 255, 0.64)" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <MoreHorizontal size={24} color="rgba(255, 255, 255, 0.64)" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.briefcaseIcon}>
            <Briefcase size={16} color="#A19375" />
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
            <View style={styles.roomsBadge}>
              <Text style={styles.roomsBadgeText}>+36</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Bottom Navigation */}
      <View style={styles.bottomNav}>
        <View style={styles.navGradient} />
        <View style={styles.navContainer}>
          <TouchableOpacity style={styles.navButton}>
            <MessageCircle size={20} color="#121212" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButtonSecondary}>
            <Search size={24} color="rgba(255, 255, 255, 0.64)" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButtonSecondary}>
            <Camera size={24} color="rgba(255, 255, 255, 0.64)" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={{ uri: currentUser.avatar }} style={styles.navAvatar} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    position: 'relative',
    width: 375,
    minHeight: 812,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: 4,
    paddingBottom: 98,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 375,
    height: 147,
    backgroundColor: '#121212',
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 15,
    zIndex: 2,
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 351,
    height: 40,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    width: 265,
    height: 40,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Abril Fatface',
    color: '#FFFFFF',
    letterSpacing: -0.005,
    lineHeight: 29,
    flex: 1,
    width: 213,
    height: 17,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 86,
    height: 40,
    justifyContent: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 351,
    height: 32,
  },
  briefcaseIcon: {
    width: 40,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(161, 147, 117, 0.04)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  tab: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    width: 60,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.64)',
    textAlign: 'center',
    lineHeight: 21,
  },
  activeTabText: {
    color: '#121212',
  },
  roomsBadge: {
    backgroundColor: '#A19375',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginLeft: 4,
    width: 32,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomsBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#121212',
    textAlign: 'center',
    lineHeight: 15,
  },
  section: {
    backgroundColor: '#121212',
    padding: 12,
    gap: 12,
    width: 375,
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 351,
    height: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.64)',
    flex: 1,
    lineHeight: 18,
  },
  sectionCount: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 18,
  },
  sectionContent: {
    gap: 16,
    borderRadius: 8,
    width: 351,
    alignItems: 'flex-start',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    width: 351,
    height: 56,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineAvatarContainer: {
    backgroundColor: '#1ED760',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  conversationContent: {
    flex: 1,
    gap: 8,
    width: 299,
    height: 56,
    alignItems: 'flex-start',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 299,
    height: 16,
  },
  topicContainer: {
    backgroundColor: '#262626',
    borderRadius: 4,
    paddingHorizontal: 4,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.64)',
    textAlign: 'center',
    lineHeight: 15,
  },
  yourTurnBadge: {
    backgroundColor: '#262626',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
    width: 61,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yourTurnText: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '600',
    color: '#F8F9FB',
    textAlign: 'center',
    lineHeight: 15,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
    width: 299,
    height: 32,
  },
  leftBottomContent: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 8,
    width: 245,
    height: 32,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 91,
    height: 12,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 22,
  },
  verifiedIcon: {
    width: 12,
    height: 12,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 245,
    height: 12,
    alignSelf: 'stretch',
  },
  messageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#A19375',
  },
  lastMessage: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.64)',
    flex: 1,
    lineHeight: 22,
  },
  messageSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.48)',
  },
  rightColumn: {
    alignItems: 'flex-end',
    gap: 8,
    width: 54,
    height: 30,
    justifyContent: 'center',
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Poppins',
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.64)',
    textAlign: 'right',
    width: 54,
    height: 8,
    lineHeight: 22,
  },
  unreadBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 2,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 10,
    fontFamily: 'Poppins',
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 375,
    height: 98,
    paddingTop: 8,
    paddingBottom: 34,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  navGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#121212',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    gap: 8,
    width: 224,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 28,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(20, 20, 20, 0.24)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 28.44,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  navButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonSecondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});