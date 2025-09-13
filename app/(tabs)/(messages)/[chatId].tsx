import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, Alert, ActionSheetIOS } from 'react-native';
import { Send, Plus, Mic, Image as ImageIcon, Video, Smile, BarChart3, Copy, Heart, Reply, Edit3, Trash2, X } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import { messages } from '@/mocks/data';
import { ChatMessage } from '@/types';
import { colors } from '@/constants/colors';
import { fontSizes, fonts, spacing, borderRadius } from '@/constants/fonts';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    content: "How's the progress on the mobile app project?",
    timestamp: '4d',
    isSent: false,
    type: 'text',
  },
  {
    id: '2',
    content: "Going really well! Just finished the authentication flow. Want to see a demo?",
    timestamp: '4d',
    isSent: true,
    type: 'text',
  },
  {
    id: '3',
    content: "Great collaboration on the project. The demo was impressive!",
    timestamp: '4d',
    isSent: false,
    type: 'text',
  },
];

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(mockChatMessages);
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const user = messages.find(m => m.id === chatId)?.user;

  const handleSend = () => {
    if (message.trim()) {
      if (editingMessage) {
        setChatMessages(prev => prev.map(msg => 
          msg.id === editingMessage.id 
            ? { ...msg, content: message, isEdited: true }
            : msg
        ));
        setEditingMessage(null);
      } else {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          content: message,
          timestamp: 'now',
          isSent: true,
          type: 'text',
          replyTo: replyingTo?.id,
        };
        setChatMessages([...chatMessages, newMessage]);
        setReplyingTo(null);
      }
      setMessage('');
    }
  };

  const handleLongPress = (messageItem: ChatMessage) => {
    const options = [
      'Reply',
      'Copy',
      'Like',
      ...(messageItem.isSent ? ['Edit', 'Delete'] : []),
      'Cancel'
    ];
    
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: options.length - 1,
          destructiveButtonIndex: messageItem.isSent ? options.indexOf('Delete') : undefined,
        },
        (buttonIndex) => {
          handleMessageAction(messageItem, options[buttonIndex]);
        }
      );
    } else {
      Alert.alert(
        'Message Options',
        '',
        options.map(option => ({
          text: option,
          onPress: () => handleMessageAction(messageItem, option),
          style: option === 'Delete' ? 'destructive' : 'default'
        }))
      );
    }
  };

  const handleMessageAction = (messageItem: ChatMessage, action: string) => {
    switch (action) {
      case 'Reply':
        setReplyingTo(messageItem);
        break;
      case 'Copy':
        // Copy to clipboard functionality would go here
        Alert.alert('Copied', 'Message copied to clipboard');
        break;
      case 'Like':
        setChatMessages(prev => prev.map(msg => 
          msg.id === messageItem.id 
            ? { ...msg, isLiked: !msg.isLiked }
            : msg
        ));
        break;
      case 'Edit':
        setEditingMessage(messageItem);
        setMessage(messageItem.content);
        break;
      case 'Delete':
        Alert.alert(
          'Delete Message',
          'Are you sure you want to delete this message?',
          [
            { text: 'Cancel', style: 'cancel' },
            { 
              text: 'Delete', 
              style: 'destructive',
              onPress: () => {
                setChatMessages(prev => prev.filter(msg => msg.id !== messageItem.id));
              }
            }
          ]
        );
        break;
    }
  };

  const handleAttachment = (type: string) => {
    setShowAttachments(false);
    switch (type) {
      case 'image':
        pickImage();
        break;
      case 'video':
        pickVideo();
        break;
      case 'poll':
        createPoll();
        break;
      case 'gif':
        // GIF picker would go here
        Alert.alert('GIF', 'GIF picker coming soon');
        break;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: 'Image',
        timestamp: 'now',
        isSent: true,
        type: 'image',
        mediaUrl: result.assets[0].uri,
      };
      setChatMessages([...chatMessages, newMessage]);
    }
  };

  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: 'Video',
        timestamp: 'now',
        isSent: true,
        type: 'video',
        mediaUrl: result.assets[0].uri,
      };
      setChatMessages([...chatMessages, newMessage]);
    }
  };

  const createPoll = () => {
    Alert.prompt(
      'Create Poll',
      'Enter poll question:',
      (question) => {
        if (question) {
          const newMessage: ChatMessage = {
            id: Date.now().toString(),
            content: question,
            timestamp: 'now',
            isSent: true,
            type: 'poll',
            pollOptions: [
              { id: '1', text: 'Option 1', votes: 0 },
              { id: '2', text: 'Option 2', votes: 0 },
            ],
          };
          setChatMessages([...chatMessages, newMessage]);
        }
      }
    );
  };

  const startRecording = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Please grant microphone permission');
          return;
        }

        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync({
          android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
          },
          ios: {
            extension: '.wav',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_LINEARPCM,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
          },
        });
        
        await recording.startAsync();
        recordingRef.current = recording;
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recordingRef.current && Platform.OS !== 'web') {
        await recordingRef.current.stopAndUnloadAsync();
        const uri = recordingRef.current.getURI();
        
        if (uri) {
          const newMessage: ChatMessage = {
            id: Date.now().toString(),
            content: 'Voice message',
            timestamp: 'now',
            isSent: true,
            type: 'audio',
            mediaUrl: uri,
          };
          setChatMessages([...chatMessages, newMessage]);
        }
        
        recordingRef.current = null;
        setIsRecording(false);
        
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const replyMessage = item.replyTo ? chatMessages.find(msg => msg.id === item.replyTo) : null;
    
    return (
      <TouchableOpacity 
        style={[styles.messageContainer, item.isSent && styles.sentContainer]}
        onLongPress={() => handleLongPress(item)}
      >
        <View style={[styles.messageBubble, item.isSent ? styles.sentBubble : styles.receivedBubble]}>
          {replyMessage && (
            <View style={styles.replyContainer}>
              <View style={styles.replyLine} />
              <Text style={styles.replyText} numberOfLines={1}>
                {replyMessage.content}
              </Text>
            </View>
          )}
          
          {item.type === 'image' && item.mediaUrl && (
            <Image source={{ uri: item.mediaUrl }} style={styles.messageImage} />
          )}
          
          {item.type === 'video' && (
            <View style={styles.videoContainer}>
              <Video size={24} color={item.isSent ? colors.white : colors.black} />
              <Text style={[styles.messageText, item.isSent && styles.sentText]}>Video</Text>
            </View>
          )}
          
          {item.type === 'audio' && (
            <View style={styles.audioContainer}>
              <Mic size={20} color={item.isSent ? colors.white : colors.black} />
              <Text style={[styles.messageText, item.isSent && styles.sentText]}>Voice message</Text>
            </View>
          )}
          
          {item.type === 'poll' && (
            <View style={styles.pollContainer}>
              <Text style={[styles.messageText, item.isSent && styles.sentText]}>
                {item.content}
              </Text>
              {item.pollOptions?.map(option => (
                <TouchableOpacity key={option.id} style={styles.pollOption}>
                  <Text style={[styles.pollOptionText, item.isSent && styles.sentText]}>
                    {option.text} ({option.votes})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {item.type === 'text' && (
            <Text style={[styles.messageText, item.isSent && styles.sentText]}>
              {item.content}
            </Text>
          )}
          
          <View style={styles.messageFooter}>
            <Text style={[styles.messageTime, item.isSent && styles.sentTime]}>
              {item.timestamp}{item.isEdited ? ' (edited)' : ''}
            </Text>
            {item.isLiked && (
              <Heart size={12} color={colors.red} fill={colors.red} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.username}>@{user?.username}</Text>
        </View>
      </View>

      <Text style={styles.notice}>
        This is the beginning of your conversation with {user?.name}
      </Text>

      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />

      {(replyingTo || editingMessage) && (
        <View style={styles.replyBar}>
          <View style={styles.replyInfo}>
            <Text style={styles.replyLabel}>
              {editingMessage ? 'Editing message' : `Replying to ${replyingTo?.isSent ? 'You' : user?.name}`}
            </Text>
            <Text style={styles.replyPreview} numberOfLines={1}>
              {(editingMessage || replyingTo)?.content}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => {
              setReplyingTo(null);
              setEditingMessage(null);
              setMessage('');
            }}
          >
            <X size={20} color={colors.darkGray} />
          </TouchableOpacity>
        </View>
      )}
      
      {showAttachments && (
        <View style={styles.attachmentMenu}>
          <TouchableOpacity 
            style={styles.attachmentButton}
            onPress={() => handleAttachment('image')}
          >
            <ImageIcon size={24} color={colors.primary} />
            <Text style={styles.attachmentText}>Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.attachmentButton}
            onPress={() => handleAttachment('video')}
          >
            <Video size={24} color={colors.primary} />
            <Text style={styles.attachmentText}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.attachmentButton}
            onPress={() => handleAttachment('poll')}
          >
            <BarChart3 size={24} color={colors.primary} />
            <Text style={styles.attachmentText}>Poll</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.attachmentButton}
            onPress={() => handleAttachment('gif')}
          >
            <Smile size={24} color={colors.primary} />
            <Text style={styles.attachmentText}>GIF</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={styles.attachButton}
          onPress={() => setShowAttachments(!showAttachments)}
        >
          <Plus size={24} color={colors.primary} />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          placeholder={editingMessage ? 'Edit message...' : 'Start a message...'}
          placeholderTextColor={colors.darkGray}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        
        {message.trim() ? (
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Send size={20} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.micButton}
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            <Mic size={20} color={isRecording ? colors.red : colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: spacing.lg,
  },
  userName: {
    fontSize: fontSizes.md,
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  username: {
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    color: colors.darkGray,
  },
  notice: {
    textAlign: 'center',
    color: colors.darkGray,
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    paddingVertical: spacing.lg,
  },
  messagesList: {
    padding: spacing.lg,
  },
  messageContainer: {
    marginBottom: spacing.lg,
    alignItems: 'flex-start',
  },
  sentContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  sentBubble: {
    backgroundColor: colors.primary,
  },
  receivedBubble: {
    backgroundColor: colors.lightGray,
  },
  messageText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  sentText: {
    color: colors.white,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  messageTime: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.regular,
    color: colors.darkGray,
  },
  sentTime: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingLeft: spacing.md,
  },
  replyLine: {
    width: 3,
    height: '100%',
    backgroundColor: colors.mediumGray,
    marginRight: spacing.md,
  },
  replyText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.mediumGray,
    fontStyle: 'italic',
  },
  messageImage: {
    width: 200,
    height: 150,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  videoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  pollContainer: {
    width: '100%',
  },
  pollOption: {
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  pollOptionText: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.black,
  },
  replyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.extraLightGray,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  replyInfo: {
    flex: 1,
  },
  replyLabel: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.medium,
    color: colors.primary,
  },
  replyPreview: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.regular,
    color: colors.darkGray,
    marginTop: 2,
  },
  attachmentMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.lg,
    backgroundColor: colors.extraLightGray,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  attachmentButton: {
    alignItems: 'center',
    padding: spacing.md,
  },
  attachmentText: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.regular,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  attachButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSizes.base,
    fontFamily: fonts.regular,
    maxHeight: 100,
    marginRight: spacing.md,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});