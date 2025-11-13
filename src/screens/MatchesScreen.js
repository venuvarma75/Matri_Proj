// MatchesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

// Bottom Navigation Item Component
const NavItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Icon 
      name={icon} 
      size={20} 
      color={active ? '#ff6b6b' : '#666'} 
      style={styles.navIcon} 
    />
    <Text style={[styles.navLabel, active && styles.navLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Profile Card Component
const ProfileCard = ({ profile, onInterested, onNotInterested, onViewProfile, onSendMessage }) => (
  <View style={styles.profileCard}>
    {/* Last Seen */}
    <View style={styles.lastSeen}>
      <Text style={styles.lastSeenText}>Last seen {profile.lastSeen}</Text>
    </View>

    {/* Profile Header */}
    <View style={styles.profileHeader}>
      <TouchableOpacity 
        style={styles.imageContainer}
        onPress={() => onViewProfile(profile)}
      >
        {profile.image ? (
          <Image 
            source={profile.image} 
            style={styles.profileImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.defaultImage}>
            <Icon name="user" size={30} color="#999" />
          </View>
        )}
      </TouchableOpacity>
      <View style={styles.profileBasicInfo}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <Text style={styles.profileAgeHeight}>{profile.age} • {profile.height}</Text>
        <Text style={styles.profileEducation}>{profile.education}</Text>
      </View>
    </View>

    {/* Profile Details */}
    <View style={styles.profileDetails}>
      <View style={styles.detailItem}>
        <Icon name="map-marker-alt" size={12} color="#666" />
        <Text style={styles.detailText}>{profile.location}</Text>
      </View>
      <View style={styles.detailItem}>
        <Icon name="briefcase" size={12} color="#666" />
        <Text style={styles.detailText}>{profile.profession}</Text>
      </View>
    </View>

    {/* Bio */}
    <View style={styles.bioSection}>
      <Text style={styles.bioText} numberOfLines={2}>
        {profile.bio}
      </Text>
    </View>

    {/* Interests */}
    <View style={styles.interestsSection}>
      <Text style={styles.interestsTitle}>Interests:</Text>
      <View style={styles.interestsContainer}>
        {profile.interests.slice(0, 3).map((interest, index) => (
          <View key={index} style={styles.interestTag}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))}
        {profile.interests.length > 3 && (
          <View style={styles.interestTag}>
            <Text style={styles.interestText}>+{profile.interests.length - 3}</Text>
          </View>
        )}
      </View>
    </View>

    {/* Action Buttons */}
    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={[styles.actionButton, styles.viewProfileButton]}
        onPress={() => onViewProfile(profile)}
      >
        <Icon name="eye" size={12} color="#666" />
        <Text style={styles.viewProfileText}> View Profile</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.messageButton]}
        onPress={() => onSendMessage(profile)}
      >
        <Icon name="comment" size={12} color="#666" />
        <Text style={styles.messageText}> Message</Text>
      </TouchableOpacity>
    </View>

    {/* Interest Question */}
    <View style={styles.interestQuestionSection}>
      <Text style={styles.interestQuestion}>Interested with this profile?</Text>
      <View style={styles.interestActions}>
        <TouchableOpacity 
          style={[styles.interestButton, styles.interestedButton]} 
          onPress={() => onInterested(profile)}
        >
          <Text style={styles.interestedButtonText}>Yes, Interested</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.interestButton, styles.notInterestedButton]} 
          onPress={() => onNotInterested(profile)}
        >
          <Text style={styles.notInterestedButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const MatchesScreen = ({ user, onLogout, profileImages, navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [interestedProfiles, setInterestedProfiles] = useState([]);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [currentInterestedProfile, setCurrentInterestedProfile] = useState(null);

  const profiles = [
    {
      id: 1,
      name: 'Srivalli',
      age: '22 yrs',
      height: '5\'0"',
      education: 'B.Tech',
      location: 'Hyderabad',
      profession: 'Software Engineer',
      lastSeen: '2m ago',
      image: profileImages?.srivalli,
      bio: 'Software engineer passionate about technology and innovation. Love traveling and exploring new cultures.',
      interests: ['Coding', 'Travel', 'Music', 'Photography']
    },
    {
      id: 2,
      name: 'Vijay Kumar',
      age: '24 yrs',
      height: '5\'2"',
      education: 'MBA',
      location: 'Bangalore',
      profession: 'Marketing Manager',
      lastSeen: '5m ago',
      image: profileImages?.vijay,
      bio: 'Marketing professional with a creative mindset. Enjoy cooking and outdoor activities.',
      interests: ['Marketing', 'Cooking', 'Yoga', 'Reading']
    },
    {
      id: 3,
      name: 'Anitha',
      age: '23 yrs',
      height: '5\'1"',
      education: 'B.Tech',
      location: 'Chennai',
      profession: 'Data Scientist',
      lastSeen: '10m ago',
      image: profileImages?.anitha,
      bio: 'Data scientist who loves solving complex problems. Passionate about AI and machine learning.',
      interests: ['Data Science', 'AI', 'Chess', 'Dancing']
    },
    {
      id: 4,
      name: 'Rahul Kumar',
      age: '25 yrs',
      height: '5\'8"',
      education: 'M.Tech',
      location: 'Delhi',
      profession: 'Product Manager',
      lastSeen: '15m ago',
      image: profileImages?.rahul,
      bio: 'Product manager with expertise in tech products. Love sports and fitness activities.',
      interests: ['Product Management', 'Cricket', 'Gym', 'Movies']
    },
  ];

  // Initialize filtered profiles
  useEffect(() => {
    setFilteredProfiles(profiles);
  }, []);

  // Navigation handlers
  const navigateToHome = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('dashboard');
    }
  };

  const navigateToMatches = () => {
    // Already on matches screen
  };

  const navigateToChat = (profile) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('chat', { profile });
    }
  };

  const navigateToProfile = () => {
    Alert.alert('Coming Soon', 'Profile feature will be available soon!');
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProfiles(profiles);
    } else {
      const filtered = profiles.filter(profile =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.education.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProfiles(filtered);
    }
  }, [searchQuery]);

  const handleInterested = (profile) => {
    console.log('Interested in:', profile.name);
    
    // Add to interested profiles if not already added
    if (!interestedProfiles.find(p => p.id === profile.id)) {
      setInterestedProfiles(prev => [...prev, profile]);
    }
    
    // Show interest confirmation modal
    setCurrentInterestedProfile(profile);
    setShowInterestModal(true);
    
    // Navigate to chat after a delay
    setTimeout(() => {
      setShowInterestModal(false);
      navigateToChat(profile);
    }, 2000);
  };

  const handleNotInterested = (profile) => {
    console.log('Not interested in:', profile.name);
    Alert.alert(
      'Profile Passed',
      `You passed on ${profile.name}. We'll show you more matches.`,
      [{ text: 'OK', style: 'default' }]
    );
  };

  const handleSendMessage = (profile) => {
    if (navigation && navigation.navigate) {
      navigation.navigate('chat', { profile });
    }
  };

  const handleViewProfile = (profile) => {
    Alert.alert(
      'Profile Details',
      `${profile.name}\n\nAge: ${profile.age}\nHeight: ${profile.height}\nEducation: ${profile.education}\nLocation: ${profile.location}\nProfession: ${profile.profession}\n\nBio: ${profile.bio}\n\nInterests: ${profile.interests.join(', ')}`,
      [
        { text: 'OK', style: 'default' }
      ]
    );
  };

  const handleViewInterestedProfiles = () => {
    if (interestedProfiles.length === 0) {
      Alert.alert('No Interests', 'You haven\'t shown interest in any profiles yet.');
      return;
    }

    Alert.alert(
      'Your Interested Profiles',
      `You have shown interest in ${interestedProfiles.length} profile(s):\n\n${interestedProfiles.map(p => `• ${p.name}`).join('\n')}`,
      [
        { 
          text: 'OK', 
          style: 'default' 
        },
        {
          text: 'Chat with Latest',
          onPress: () => {
            if (interestedProfiles.length > 0) {
              navigateToChat(interestedProfiles[interestedProfiles.length - 1]);
            }
          }
        }
      ]
    );
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => {
            if (onLogout) {
              onLogout();
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>matches</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.interestedButtonHeader}
            onPress={handleViewInterestedProfiles}
          >
            <Icon name="heart" size={16} color="#ff6b6b" />
            <Text style={styles.interestedCount}>{interestedProfiles.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="sign-out-alt" size={18} color="#ff6b6b" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBox}>
          <Text style={styles.searchTitle}>search by criteria</Text>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, location, profession, education..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                <Icon name="times" size={14} color="#666" />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search" size={16} color="#666" />
            </TouchableOpacity>
          </View>
          {searchQuery.length > 0 && (
            <Text style={styles.searchResults}>
              {filteredProfiles.length} profile(s) found
            </Text>
          )}
        </View>
      </View>

      {/* Profiles List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredProfiles.length > 0 ? (
          <View style={styles.profilesList}>
            {filteredProfiles.map(profile => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onInterested={handleInterested}
                onNotInterested={handleNotInterested}
                onViewProfile={handleViewProfile}
                onSendMessage={handleSendMessage}
              />
            ))}
          </View>
        ) : (
          <View style={styles.noResults}>
            <Icon name="search" size={50} color="#ccc" />
            <Text style={styles.noResultsText}>No profiles found</Text>
            <Text style={styles.noResultsSubText}>
              Try adjusting your search criteria
            </Text>
            <TouchableOpacity style={styles.clearSearchButton} onPress={clearSearch}>
              <Text style={styles.clearSearchButtonText}>Clear Search</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Extra space for bottom navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Interest Confirmation Modal */}
      <Modal
        visible={showInterestModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowInterestModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Icon name="heart" size={50} color="#ff6b6b" />
            <Text style={styles.modalTitle}>Interest Sent!</Text>
            <Text style={styles.modalText}>
              You've shown interest in {currentInterestedProfile?.name}
            </Text>
            <Text style={styles.modalSubText}>
              Taking you to chat...
            </Text>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem 
          icon="home" 
          label="Home" 
          active={false} 
          onPress={navigateToHome}
        />
        <NavItem 
          icon="heart" 
          label="Matches" 
          active={true} 
          onPress={navigateToMatches}
        />
        <NavItem 
          icon="comment" 
          label="Chat" 
          active={false} 
          onPress={() => {
            if (interestedProfiles.length > 0) {
              navigateToChat(interestedProfiles[0]);
            } else {
              Alert.alert('No Chats', 'You need to show interest in profiles first to start chatting.');
            }
          }}
        />
        <NavItem 
          icon="user" 
          label="Profile" 
          active={false} 
          onPress={navigateToProfile}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '300',
    color: '#333',
    textTransform: 'lowercase',
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  interestedButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  interestedCount: {
    color: '#ff6b6b',
    fontWeight: '600',
    marginLeft: 4,
    fontSize: 12,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  searchSection: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBox: {
    marginBottom: 10,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 10,
    textTransform: 'lowercase',
    letterSpacing: 0.3,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  clearButton: {
    padding: 8,
    backgroundColor: '#f8f8f8',
  },
  searchButton: {
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  searchResults: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  scrollView: {
    flex: 1,
  },
  profilesList: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastSeen: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  lastSeenText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '300',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  defaultImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ecef',
  },
  profileBasicInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  profileAgeHeight: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  profileEducation: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
  },
  profileDetails: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  bioSection: {
    marginBottom: 12,
  },
  bioText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  interestsSection: {
    marginBottom: 12,
  },
  interestsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  interestTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  interestText: {
    fontSize: 10,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  viewProfileButton: {
    backgroundColor: '#f8f8f8',
  },
  messageButton: {
    backgroundColor: '#f0f8ff',
  },
  viewProfileText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  messageText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  interestQuestionSection: {
    alignItems: 'center',
  },
  interestQuestion: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  interestActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  interestButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  interestedButton: {
    backgroundColor: '#ff6b6b',
  },
  notInterestedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  interestedButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  notInterestedButtonText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '500',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
    marginTop: 10,
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  clearSearchButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#ff6b6b',
    borderRadius: 20,
  },
  clearSearchButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  bottomNav: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navIcon: {
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  navLabelActive: {
    color: '#ff6b6b',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default MatchesScreen;
