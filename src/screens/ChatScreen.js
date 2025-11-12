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
  const flatListRef = useRef(null);

  // Sample initial messages
  const initialMessages = [
    {
      id: 1,
      text: "Hi there! Thanks for showing interest in my profile. 😊",
      time: "10:30 AM",
      isUser: false
    },
    {
      id: 2,
      text: "Hello! I really liked your profile. Would love to know more about you.",
      time: "10:32 AM",
      isUser: true
    },
    {
      id: 3,
      text: "That's wonderful! I'm currently working as a Software Engineer in Hyderabad. What about you?",
      time: "10:33 AM",
      isUser: false
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

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
      isUser: true
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
        "I appreciate you sharing that with me."
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMsg = {
        id: messages.length + 2,
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: false
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

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessage : styles.otherMessage
    ]}>
      {!item.isUser && profile?.image && (
        <Image source={profile.image} style={styles.messageAvatar} />
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
        <Text style={[
          styles.messageTime,
          item.isUser ? styles.userMessageTime : styles.otherMessageTime
        ]}>
          {item.time}
        </Text>
      </View>
      {item.isUser && (
        <View style={styles.userAvatar}>
          <Icon name="user" size={16} color="#ff6b6b" />
        </View>
      )}
    </View>
  );

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
            <Text style={styles.profileName}>{profile?.name || 'Your Match'}</Text>
            <Text style={styles.profileStatus}>Online</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleVoiceCall}>
            <Icon name="phone" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleVideoCall}>
            <Icon name="video" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="ellipsis-v" size={18} color="#333" />
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
          ListEmptyComponent={
            <View style={styles.emptyChat}>
              <Icon name="comments" size={50} color="#ccc" />
              <Text style={styles.emptyChatText}>Start a conversation</Text>
              <Text style={styles.emptyChatSubText}>Send your first message to break the ice!</Text>
            </View>
          }
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="paperclip" size={20} color="#666" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
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
    paddingHorizontal: 15,
  },
  emptyChat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },
  emptyChatText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    marginTop: 10,
  },
  emptyChatSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#ff6b6b',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
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
    marginTop: 4,
    opacity: 0.7,
  },
  userMessageTime: {
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'right',
  },
  otherMessageTime: {
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


