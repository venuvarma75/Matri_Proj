// ChatScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ChatScreen = ({ route, navigation }) => {
  const { profile } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMatchVerified, setIsMatchVerified] = useState(true); // Set to true for testing
  const flatListRef = useRef(null);

  // Sample initial messages with proper structure
  const initialMessages = [
    {
      id: 1,
      text: "Hello! I'm excited to chat with you. Your profile really stood out!",
      time: "10:32 AM",
      isUser: true,
      type: 'text'
    },
    {
      id: 2,
      text: "That's wonderful! I'm currently working as a Software Engineer in Hyderabad. What about you?",
      time: "10:33 AM",
      isUser: false,
      type: 'text',
      senderName: profile?.name || 'Srivalli',
      senderImage: profile?.image
    },
    {
      id: 3,
      text: "I'm a Product Manager in Delhi. I love how we both work in tech!",
      time: "10:34 AM",
      isUser: true,
      type: 'text'
    },
    {
      id: 4,
      text: "That's amazing! We should definitely discuss more about our work and interests.",
      time: "10:35 AM",
      isUser: false,
      type: 'text',
      senderName: profile?.name || 'Srivalli',
      senderImage: profile?.image
    },
    {
      id: 5,
      text: "That's wonderful! I have similar interests too.",
      time: "7:06 PM",
      isUser: false,
      type: 'text',
      senderName: profile?.name || 'Srivalli',
      senderImage: profile?.image
    }
  ];

  useEffect(() => {
    // For demo, always set to verified
    setIsMatchVerified(true);
    setMessages(initialMessages);
  }, [profile]);

  useEffect(() => {
    // Scroll to bottom when new message is added
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
      type: 'text'
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Simulate reply after 1-2 seconds
    setTimeout(() => {
      const replies = [
        "That's interesting! Tell me more.",
        "I'd love to hear more about that.",
        "Sounds great! What else do you enjoy doing?",
        "That's wonderful! I have similar interests too.",
        "I appreciate you sharing that with me.",
        "That sounds amazing! Let's plan to meet sometime.",
        "I completely agree with you on that!",
        "We have so much in common, it's incredible!"
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMsg = {
        id: messages.length + 2,
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false,
        type: 'text',
        senderName: profile?.name || 'Srivalli',
        senderImage: profile?.image
      };

      setMessages(prev => [...prev, replyMsg]);
    }, 1000 + Math.random() * 1000);
  };

  const handleVoiceCall = () => {
    Alert.alert(
      "Voice Call",
      `Call ${profile?.name || 'this person'}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Alert.alert("Calling...", `Connecting to ${profile?.name}`) }
      ]
    );
  };

  const handleVideoCall = () => {
    Alert.alert(
      "Video Call",
      `Start video call with ${profile?.name || 'this person'}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Alert.alert("Connecting...", `Starting video call with ${profile?.name}`) }
      ]
    );
  };

  const handleViewProfile = () => {
    if (profile) {
      Alert.alert(
        'Profile Details',
        `${profile.name}\n\nAge: ${profile.age}\nHeight: ${profile.height}\nEducation: ${profile.education}\nLocation: ${profile.location}\nProfession: ${profile.profession}\n\nBio: ${profile.bio}\n\nInterests: ${profile.interests?.join(', ')}`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const renderMessage = ({ item, index }) => {
    const showAvatar = !item.isUser && (
      index === 0 || 
      messages[index - 1].isUser !== item.isUser ||
      !messages[index - 1].senderName
    );

    return (
      <View style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.otherMessage
      ]}>
        {/* Other User's Avatar - Only show for first message in sequence */}
        {!item.isUser && showAvatar && (
          <View style={styles.avatarContainer}>
            {item.senderImage ? (
              <Image source={item.senderImage} style={styles.messageAvatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="user" size={16} color="#fff" />
              </View>
            )}
          </View>
        )}
        
        {/* Spacer for when avatar is hidden */}
        {!item.isUser && !showAvatar && (
          <View style={styles.avatarSpacer} />
        )}

        <View style={styles.messageContent}>
          {/* Sender Name for other user's messages */}
          {!item.isUser && showAvatar && item.senderName && (
            <Text style={styles.senderName}>{item.senderName}</Text>
          )}
          
          <View style={[
            styles.messageBubble,
            item.isUser ? styles.userBubble : styles.otherBubble
          ]}>
            <Text style={[
              styles.messageText,
              item.isUser ? styles.userMessageText : styles.otherMessageText
            ]}>
              {item.text}
            </Text>
          </View>
          
          <Text style={[
            styles.messageTime,
            item.isUser ? styles.userMessageTime : styles.otherMessageTime
          ]}>
            {item.time}
          </Text>
        </View>

        {/* Current User's Avatar */}
        {item.isUser && (
          <View style={styles.userAvatarContainer}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>Y</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ff6b6b" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={20} color="#333" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.profileInfo}
          onPress={handleViewProfile}
        >
          {profile?.image ? (
            <Image source={profile.image} style={styles.headerAvatar} />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Icon name="user" size={20} color="#fff" />
            </View>
          )}
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{profile?.name || 'Srivalli'}</Text>
            <Text style={styles.profileStatus}>
              <Icon name="check-circle" size={12} color="#4CAF50" /> Online
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleVoiceCall}>
            <Icon name="phone" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleVideoCall}>
            <Icon name="video" size={18} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages List */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          contentContainerStyle={styles.messagesContent}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="paperclip" size={20} color="#666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder={`Message ${profile?.name || 'Srivalli'}...`}
            placeholderTextColor="#999"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          
          <TouchableOpacity style={styles.emojiButton}>
            <Icon name="smile" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Icon 
              name="paper-plane" 
              size={18} 
              color={newMessage.trim() ? "#fff" : "#ccc"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    marginLeft: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 10,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    marginRight: 8,
    alignItems: 'center',
  },
  avatarSpacer: {
    width: 36,
    marginRight: 8,
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ff6b6b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContent: {
    flex: 1,
    maxWidth: '80%',
  },
  senderName: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 2,
    marginLeft: 8,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    marginBottom: 4,
  },
  userBubble: {
    backgroundColor: '#ff6b6b',
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  otherMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 11,
    opacity: 0.7,
    marginHorizontal: 8,
  },
  userMessageTime: {
    color: '#666',
    textAlign: 'right',
  },
  otherMessageTime: {
    color: '#666',
    textAlign: 'left',
  },
  userAvatarContainer: {
    width: 36,
    marginLeft: 8,
    alignItems: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 15,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  attachButton: {
    padding: 10,
    marginRight: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
    color: '#333',
    marginHorizontal: 5,
  },
  emojiButton: {
    padding: 10,
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#ff6b6b',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
});

export default ChatScreen;