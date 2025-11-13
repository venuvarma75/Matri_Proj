// Dashboard.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

// Compact Stat Card Component
const StatCard = ({ icon, title, value }) => (
  <View style={styles.statCard}>
    <Icon name={icon} size={16} color="#ff6b6b" style={styles.statIcon} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

// Match Card Component
const MatchCard = ({ name, age, profession, image, onLike, onPass }) => (
  <View style={styles.matchCard}>
    <View style={styles.matchImg}>
      {image ? (
        <Image 
          source={image} 
          style={styles.profileImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.defaultImage}>
          <Icon name="user" size={24} color="#999" />
        </View>
      )}
    </View>
    <View style={styles.matchInfo}>
      <Text style={styles.matchName}>{name}</Text>
      <Text style={styles.matchDetails}>{age}, {profession}</Text>
      <View style={styles.matchActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.likeButton]} 
          onPress={onLike}
        >
          <Icon name="heart" size={10} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.passButton]} 
          onPress={onPass}
        >
          <Icon name="times" size={10} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// Bottom Navigation Item Component
const NavItem = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Icon 
      name={icon} 
      size={18} 
      color={active ? '#ff6b6b' : '#999'} 
    />
    <Text style={[
      styles.navLabel,
      { color: active ? '#ff6b6b' : '#999' }
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Dashboard = ({ user, onLogout, profileImages, navigation }) => {
  const userName = user?.fullName || user?.username || 'Teja';
  
  const recommendedMatches = [
    { 
      id: 1, 
      name: "Priya", 
      age: "25", 
      profession: "Software Engineer",
      image: profileImages?.priya
    },
    { 
      id: 2, 
      name: "Anjali", 
      age: "27", 
      profession: "Doctor",
      image: profileImages?.anjali
    },
    { 
      id: 3, 
      name: "Sneha", 
      age: "24", 
      profession: "Teacher",
      image: profileImages?.sneha
    },
    { 
      id: 4, 
      name: "Divya", 
      age: "26", 
      profession: "Architect",
      image: profileImages?.divya
    }
  ];

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

  const handleLike = (name) => {
    Alert.alert('Interest Sent', `You liked ${name}!`);
  };

  const handlePass = (name) => {
    Alert.alert('Profile Passed', `You passed on ${name}`);
  };

  const navigateToHome = () => {
    // Already on home screen
  };

  const navigateToMatches = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('matches');
    }
  };

  const navigateToChat = () => {
    Alert.alert('Chat', 'Please go to Matches screen to start chatting with your connections.');
  };

  const navigateToProfile = () => {
    Alert.alert('Coming Soon', 'Profile feature will be available soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header with User Info and Logout */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.welcomeText}>
            Welcome, <Text style={styles.userName}>{userName}</Text>
          </Text>
          <Text style={styles.userEmail}>{user?.email || ''}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="sign-out-alt" size={16} color="#ff6b6b" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      {/* Main Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchBox}>
            <Text style={styles.searchTitle}>
              <Icon name="search" size={14} color="#666" /> Quick search by criteria
            </Text>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name, location, etc."
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.searchButton}>
                <Icon name="filter" size={14} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Profile Completion Section */}
        <View style={styles.profileAlert}>
          <View style={styles.alertHeader}>
            <Icon name="user-edit" size={18} color="#ff6b6b" />
            <Text style={styles.alertTitle}>Your profile is in progress</Text>
          </View>
          <Text style={styles.alertText}>Complete now to get more matches</Text>
          <TouchableOpacity style={styles.completeButton}>
            <Icon name="edit" size={12} color="white" />
            <Text style={styles.completeButtonText}> Complete Now</Text>
          </TouchableOpacity>
        </View>

        {/* Compact Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <StatCard icon="eye" title="Viewed You" value="24" />
            <StatCard icon="paper-plane" title="Sent Request" value="12" />
            <StatCard icon="envelope" title="Received Request" value="8" />
            <StatCard icon="handshake" title="Request Accepted" value="5" />
          </View>
        </View>

        {/* Recommended Matches Section */}
        <View style={styles.matchesSection}>
          <Text style={styles.sectionTitle}>
            <Icon name="users" size={16} color="#333" /> Recommended Matches
          </Text>
          <View style={styles.matchesGrid}>
            {recommendedMatches.map(match => (
              <MatchCard 
                key={match.id}
                name={match.name}
                age={match.age}
                profession={match.profession}
                image={match.image}
                onLike={() => handleLike(match.name)}
                onPass={() => handlePass(match.name)}
              />
            ))}
          </View>
        </View>

        {/* Additional Space for Bottom Navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <NavItem 
          icon="home" 
          label="Home" 
          active={true} 
          onPress={navigateToHome}
        />
        <NavItem 
          icon="heart" 
          label="Matches" 
          active={false} 
          onPress={navigateToMatches}
        />
        <NavItem 
          icon="comment" 
          label="Chat" 
          active={false} 
          onPress={navigateToChat}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userName: {
    color: '#ff6b6b',
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ff6b6b',
  },
  logoutText: {
    color: '#ff6b6b',
    fontWeight: '500',
    marginLeft: 4,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  searchSection: {
    marginBottom: 16,
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  searchTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
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
    padding: 8,
    fontSize: 12,
    color: '#333',
  },
  searchButton: {
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
  },
  profileAlert: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#ff6b6b',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  alertText: {
    color: '#666',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 26,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginLeft: 26,
  },
  completeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  statsSection: {
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    width: (width - 48) / 4,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 6,
  },
  statTitle: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  matchesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  matchesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  matchCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: (width - 48) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  matchImg: {
    height: 100,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  matchInfo: {
    padding: 12,
  },
  matchName: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 4,
    color: '#333',
  },
  matchDetails: {
    color: '#666',
    fontSize: 10,
    marginBottom: 8,
  },
  matchActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    minWidth: 40,
  },
  likeButton: {
    backgroundColor: '#ff6b6b',
  },
  passButton: {
    backgroundColor: '#e9ecef',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 4,
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 16,
  },
});

export default Dashboard;