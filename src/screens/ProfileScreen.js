import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  useWindowDimensions,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (screenWidth / 375) * size;
const verticalScale = (size) => (screenHeight / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const ProfileScreen = ({ user, onNavigateBack, onLogout }) => {
  const [activeTab, setActiveTab] = useState('personal');
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [activeEditSection, setActiveEditSection] = useState(null);
  
  const { width, height } = useWindowDimensions();
  const isSmallDevice = width < 360;
  const isTablet = width >= 768;

  // Initialize user data
  const userData = {
    // Basic Details
    fullName: user?.fullName || "Not provided",
    mobileNumber: user?.mobileNumber || user?.mobile || "Not provided",
    age: user?.age || "Not provided",
    dateOfBirth: user?.dateOfBirth || "Not provided",
    email: user?.email || "Not provided",
    gender: user?.gender || "Not provided",
    
    // Religion Details
    religion: user?.religion || "Not provided",
    caste: user?.caste || "Not provided",
    subCaste: user?.subCaste || "Not provided",
    dosham: user?.dosham || "Not provided",
    willingToMarryOtherCaste: user?.willingToMarryOtherCaste || false,
    
    // Personal Details
    maritalStatus: user?.maritalStatus || "Not provided",
    noOfChildren: user?.noOfChildren || "Not provided",
    childrenLivingWithYou: user?.childrenLivingWithYou || "Not provided",
    height: user?.height || "Not provided",
    familyStatus: user?.familyStatus || "Not provided",
    familyType: user?.familyType || "Not provided",
    
    // Professional Details
    highestEducation: user?.highestEducation || "Not provided",
    employedIn: user?.employedIn || "Not provided",
    occupation: user?.occupation || "Not provided",
    annualIncome: user?.annualIncome || "Not provided",
    workLocation: user?.workLocation || "Not provided",
    state: user?.state || "Not provided",
    
    // About Yourself
    aboutYourself: user?.aboutYourself || user?.aboutMe || "Not provided",
    
    // Interests
    interests: user?.interests || ["Not provided"]
  };

  // Initialize edited data when user data changes
  React.useEffect(() => {
    setEditedData(userData);
  }, [user]);

  // Debug function
  const debugUserData = () => {
    console.log('🔍 USER DATA IN PROFILE SCREEN:', user);
    console.log('📊 Processed User Data:', userData);
  };

  // Call debug on component mount
  React.useEffect(() => {
    console.log('🔍 PROFILE SCREEN - User Data Received', user);
  }, [user]);

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveProfile = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save all changes?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setEditMode(false)
        },
        {
          text: "Save",
          onPress: () => {
            // Here you would typically send the updated data to your backend
            console.log('💾 Saving profile data:', editedData);
            Alert.alert("Success", "Profile updated successfully!");
            setEditMode(false);
            setActiveEditSection(null);
          }
        }
      ]
    );
  };

  const handleCancelEdit = () => {
    Alert.alert(
      "Cancel Changes",
      "Are you sure you want to cancel? All unsaved changes will be lost.",
      [
        {
          text: "Continue Editing",
          style: "cancel"
        },
        {
          text: "Cancel Changes",
          onPress: () => {
            setEditedData(userData);
            setEditMode(false);
            setActiveEditSection(null);
          }
        }
      ]
    );
  };

  const handleNavigateBack = () => {
    if (onNavigateBack) {
      onNavigateBack();
    }
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

  const handleFieldChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestChange = (index, value) => {
    const newInterests = [...(editedData.interests || [])];
    newInterests[index] = value;
    setEditedData(prev => ({
      ...prev,
      interests: newInterests
    }));
  };

  const addInterest = () => {
    const newInterests = [...(editedData.interests || [])];
    newInterests.push("New Interest");
    setEditedData(prev => ({
      ...prev,
      interests: newInterests
    }));
  };

  const removeInterest = (index) => {
    const newInterests = [...(editedData.interests || [])];
    newInterests.splice(index, 1);
    setEditedData(prev => ({
      ...prev,
      interests: newInterests
    }));
  };

  // Profile Info Card Component
  const ProfileInfoCard = ({ title, value, icon, field, editable = true }) => (
    <View style={styles.infoCard}>
      <View style={styles.infoHeader}>
        <Icon name={icon} size={14} color="#4a154b" />
        <Text style={styles.infoTitle}>{title}</Text>
        {editMode && editable && (
          <TouchableOpacity 
            style={styles.editFieldButton}
            onPress={() => setActiveEditSection(field)}
          >
            <Icon name="edit" size={10} color="#4a154b" />
          </TouchableOpacity>
        )}
      </View>
      {editMode && activeEditSection === field ? (
        <TextInput
          style={styles.editInput}
          value={editedData[field] || ''}
          onChangeText={(text) => handleFieldChange(field, text)}
          onBlur={() => setActiveEditSection(null)}
          autoFocus
        />
      ) : (
        <Text style={styles.infoValue}>{value || "Not provided"}</Text>
      )}
    </View>
  );

  // Boolean Info Card Component (for yes/no fields)
  const BooleanInfoCard = ({ title, value, icon, field }) => (
    <View style={styles.infoCard}>
      <View style={styles.infoHeader}>
        <Icon name={icon} size={14} color="#4a154b" />
        <Text style={styles.infoTitle}>{title}</Text>
        {editMode && (
          <TouchableOpacity 
            style={styles.editFieldButton}
            onPress={() => setActiveEditSection(field)}
          >
            <Icon name="edit" size={10} color="#4a154b" />
          </TouchableOpacity>
        )}
      </View>
      {editMode && activeEditSection === field ? (
        <View style={styles.booleanOptions}>
          <TouchableOpacity 
            style={[styles.booleanButton, editedData[field] && styles.booleanButtonActive]}
            onPress={() => handleFieldChange(field, true)}
          >
            <Text style={[styles.booleanButtonText, editedData[field] && styles.booleanButtonTextActive]}>
              Yes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.booleanButton, !editedData[field] && styles.booleanButtonActive]}
            onPress={() => handleFieldChange(field, false)}
          >
            <Text style={[styles.booleanButtonText, !editedData[field] && styles.booleanButtonTextActive]}>
              No
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.infoValue}>{value ? "Yes" : "No"}</Text>
      )}
    </View>
  );

  // Section Component
  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  // Edit Modal for About Yourself
  const AboutYourselfModal = () => (
    <Modal
      visible={activeEditSection === 'aboutYourself'}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit About Yourself</Text>
          <TextInput
            style={styles.textAreaInput}
            value={editedData.aboutYourself || ''}
            onChangeText={(text) => handleFieldChange('aboutYourself', text)}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setActiveEditSection(null)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.saveButton]}
              onPress={() => setActiveEditSection(null)}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleNavigateBack}
        >
          <Icon name="arrow-left" size={18} color="#4a154b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.debugButton} 
            onPress={debugUserData}
          >
            <Icon name="bug" size={12} color="#fff" />
          </TouchableOpacity>
          {!editMode ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Icon name="edit" size={16} color="#4a154b" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editModeButtons}>
              <TouchableOpacity style={styles.cancelEditButton} onPress={handleCancelEdit}>
                <Text style={styles.cancelEditButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Icon name="user" size={40} color="#fff" />
              </View>
              {editMode && (
                <TouchableOpacity style={styles.cameraButton}>
                  <Icon name="camera" size={12} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
            
            <View style={styles.profileInfo}>
              {editMode && activeEditSection === 'fullName' ? (
                <TextInput
                  style={styles.nameInput}
                  value={editedData.fullName || ''}
                  onChangeText={(text) => handleFieldChange('fullName', text)}
                  onBlur={() => setActiveEditSection(null)}
                  autoFocus
                />
              ) : (
                <View style={styles.nameContainer}>
                  <Text style={styles.userName}>{editedData.fullName}</Text>
                  {editMode && (
                    <TouchableOpacity 
                      style={styles.inlineEditButton}
                      onPress={() => setActiveEditSection('fullName')}
                    >
                      <Icon name="edit" size={12} color="#4a154b" />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <Text style={styles.userAge}>{editedData.age} yrs • {editedData.height}</Text>
              <Text style={styles.userProfession}>
                <Icon name="briefcase" size={12} color="#666" /> {editedData.occupation}
              </Text>
              <Text style={styles.userLocation}>
                <Icon name="map-marker-alt" size={12} color="#666" /> {editedData.workLocation}, {editedData.state}
              </Text>
            </View>
          </View>

          {editMode && (
            <View style={styles.editModeIndicator}>
              <Icon name="pencil-alt" size={14} color="#fff" />
              <Text style={styles.editModeText}>Edit Mode</Text>
            </View>
          )}

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'personal' && styles.activeTab]}
              onPress={() => setActiveTab('personal')}
            >
              <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
                Personal
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'professional' && styles.activeTab]}
              onPress={() => setActiveTab('professional')}
            >
              <Text style={[styles.tabText, activeTab === 'professional' && styles.activeTabText]}>
                Professional
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'family' && styles.activeTab]}
              onPress={() => setActiveTab('family')}
            >
              <Text style={[styles.tabText, activeTab === 'family' && styles.activeTabText]}>
                Family
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {activeTab === 'personal' && (
            <View style={styles.tabContent}>
              {/* Basic Information */}
              <Section title="Basic Information">
                <ProfileInfoCard 
                  title="Full Name" 
                  value={editedData.fullName} 
                  icon="user"
                  field="fullName"
                />
                <ProfileInfoCard 
                  title="Mobile Number" 
                  value={editedData.mobileNumber} 
                  icon="mobile-alt"
                  field="mobileNumber"
                />
                <ProfileInfoCard 
                  title="Email ID" 
                  value={editedData.email} 
                  icon="envelope"
                  field="email"
                />
                <ProfileInfoCard 
                  title="Date of Birth" 
                  value={editedData.dateOfBirth} 
                  icon="calendar"
                  field="dateOfBirth"
                />
                <ProfileInfoCard 
                  title="Age" 
                  value={editedData.age} 
                  icon="birthday-cake"
                  field="age"
                />
                <ProfileInfoCard 
                  title="Gender" 
                  value={editedData.gender} 
                  icon="venus-mars"
                  field="gender"
                />
              </Section>

              {/* Religion Details */}
              <Section title="Religion Details">
                <ProfileInfoCard 
                  title="Religion" 
                  value={editedData.religion} 
                  icon="pray"
                  field="religion"
                />
                <ProfileInfoCard 
                  title="Caste" 
                  value={editedData.caste} 
                  icon="users"
                  field="caste"
                />
                <ProfileInfoCard 
                  title="Sub Caste" 
                  value={editedData.subCaste} 
                  icon="user-friends"
                  field="subCaste"
                />
                <ProfileInfoCard 
                  title="Dosham" 
                  value={editedData.dosham} 
                  icon="star-and-crescent"
                  field="dosham"
                />
                <BooleanInfoCard 
                  title="Willing to marry other caste" 
                  value={editedData.willingToMarryOtherCaste} 
                  icon="heart"
                  field="willingToMarryOtherCaste"
                />
              </Section>
            </View>
          )}

          {activeTab === 'professional' && (
            <View style={styles.tabContent}>
              {/* Education & Career */}
              <Section title="Education & Career">
                <ProfileInfoCard 
                  title="Highest Education" 
                  value={editedData.highestEducation} 
                  icon="graduation-cap"
                  field="highestEducation"
                />
                <ProfileInfoCard 
                  title="Occupation" 
                  value={editedData.occupation} 
                  icon="briefcase"
                  field="occupation"
                />
                <ProfileInfoCard 
                  title="Employed In" 
                  value={editedData.employedIn} 
                  icon="building"
                  field="employedIn"
                />
                <ProfileInfoCard 
                  title="Annual Income" 
                  value={editedData.annualIncome} 
                  icon="money-bill-wave"
                  field="annualIncome"
                />
                <ProfileInfoCard 
                  title="Work Location" 
                  value={editedData.workLocation} 
                  icon="map-marker-alt"
                  field="workLocation"
                />
                <ProfileInfoCard 
                  title="State" 
                  value={editedData.state} 
                  icon="globe-asia"
                  field="state"
                />
              </Section>

              {/* About Yourself */}
              <Section title="About Yourself">
                <View style={styles.aboutCard}>
                  <View style={styles.aboutHeader}>
                    <Text style={styles.aboutTitle}>About Yourself</Text>
                    {editMode && (
                      <TouchableOpacity 
                        style={styles.editAboutButton}
                        onPress={() => setActiveEditSection('aboutYourself')}
                      >
                        <Icon name="edit" size={14} color="#4a154b" />
                        <Text style={styles.editAboutText}> Edit</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text style={styles.aboutText}>
                    {editedData.aboutYourself}
                  </Text>
                </View>
              </Section>

              {/* Interests */}
              <Section title="Interests">
                <View style={styles.interestsContainer}>
                  {editedData.interests && editedData.interests.map((interest, index) => (
                    <View key={index} style={styles.interestTag}>
                      {editMode && activeEditSection === `interest-${index}` ? (
                        <TextInput
                          style={styles.interestInput}
                          value={interest}
                          onChangeText={(text) => handleInterestChange(index, text)}
                          onBlur={() => setActiveEditSection(null)}
                          autoFocus
                        />
                      ) : (
                        <View style={styles.interestContent}>
                          <Text style={styles.interestText}>{interest}</Text>
                          {editMode && (
                            <TouchableOpacity 
                              style={styles.editInterestButton}
                              onPress={() => setActiveEditSection(`interest-${index}`)}
                            >
                              <Icon name="edit" size={8} color="#fff" />
                            </TouchableOpacity>
                          )}
                        </View>
                      )}
                      {editMode && (
                        <TouchableOpacity 
                          style={styles.removeInterestButton}
                          onPress={() => removeInterest(index)}
                        >
                          <Icon name="times" size={8} color="#fff" />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                  {editMode && (
                    <TouchableOpacity style={styles.addInterestButton} onPress={addInterest}>
                      <Icon name="plus" size={12} color="#4a154b" />
                      <Text style={styles.addInterestText}>Add Interest</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Section>
            </View>
          )}

          {activeTab === 'family' && (
            <View style={styles.tabContent}>
              {/* Family Details */}
              <Section title="Family Details">
                <ProfileInfoCard 
                  title="Marital Status" 
                  value={editedData.maritalStatus === "Yes" ? "Married" : editedData.maritalStatus === "No" ? "Never Married" : editedData.maritalStatus} 
                  icon="ring"
                  field="maritalStatus"
                />
                {(editedData.maritalStatus === "Yes" || editedData.noOfChildren) && (
                  <>
                    <ProfileInfoCard 
                      title="Number of Children" 
                      value={editedData.noOfChildren} 
                      icon="child"
                      field="noOfChildren"
                    />
                    <ProfileInfoCard 
                      title="Children Living With You" 
                      value={editedData.childrenLivingWithYou} 
                      icon="home"
                      field="childrenLivingWithYou"
                    />
                  </>
                )}
                <ProfileInfoCard 
                  title="Family Status" 
                  value={editedData.familyStatus} 
                  icon="chart-line"
                  field="familyStatus"
                />
                <ProfileInfoCard 
                  title="Family Type" 
                  value={editedData.familyType} 
                  icon="users"
                  field="familyType"
                />
              </Section>

              {/* Lifestyle */}
              <Section title="Lifestyle">
                <ProfileInfoCard 
                  title="Height" 
                  value={editedData.height} 
                  icon="ruler-vertical"
                  field="height"
                />
              </Section>
            </View>
          )}

          {/* Logout Button */}
          {!editMode && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Icon name="sign-out-alt" size={16} color="#fff" />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <AboutYourselfModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(15),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: moderateScale(8),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color:''
    // color: '#4a154b',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'orange',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(16),
    marginLeft: moderateScale(8),
  },
  editButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#4a154b',
    marginLeft: moderateScale(4),
  },
  editModeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelEditButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(16),
    marginRight: moderateScale(8),
  },
  cancelEditButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#16a34a',
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(16),
  },
  saveButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#fff',
  },
//   debugButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#6c757d',
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(4),
//     borderRadius: moderateScale(12),
//   },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  profileHeader: {
    flexDirection: 'row',
    padding: moderateScale(20),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: moderateScale(15),
  },
  avatar: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: '#4a154b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#16a34a',
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(4),
  },
  nameInput: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#4a154b',
    marginBottom: verticalScale(4),
    padding: moderateScale(4),
  },
  inlineEditButton: {
    marginLeft: moderateScale(8),
    padding: moderateScale(4),
  },
  userAge: {
    fontSize: moderateScale(14),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  userProfession: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: verticalScale(2),
  },
  userLocation: {
    fontSize: moderateScale(12),
    color: '#666',
  },
  editModeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4a154b',
    paddingVertical: verticalScale(8),
  },
  editModeText: {
    color: '#fff',
    fontSize: moderateScale(12),
    fontWeight: '500',
    marginLeft: moderateScale(4),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(12),
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a154b',
  },
  tabText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#4a154b',
    fontWeight: '600',
  },
  tabContent: {
    padding: moderateScale(20),
  },
  section: {
    marginBottom: verticalScale(25),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#4a154b',
    marginBottom: verticalScale(15),
    paddingBottom: verticalScale(5),
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    marginBottom: verticalScale(10),
    borderLeftWidth: 3,
    borderLeftColor: '#4a154b',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(4),
  },
  infoTitle: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#666',
    marginLeft: moderateScale(6),
    flex: 1,
  },
  editFieldButton: {
    padding: moderateScale(4),
  },
  infoValue: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
  },
  editInput: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#4a154b',
    padding: moderateScale(4),
  },
  booleanOptions: {
    flexDirection: 'row',
    marginTop: verticalScale(4),
  },
  booleanButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#4a154b',
    marginRight: moderateScale(8),
  },
  booleanButtonActive: {
    backgroundColor: '#4a154b',
  },
  booleanButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#4a154b',
  },
  booleanButtonTextActive: {
    color: '#fff',
  },
  aboutCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: moderateScale(8),
    padding: moderateScale(15),
  },
  aboutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  aboutTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#333',
  },
  editAboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editAboutText: {
    fontSize: moderateScale(12),
    color: '#4a154b',
    fontWeight: '500',
  },
  aboutText: {
    fontSize: moderateScale(14),
    color: '#333',
    lineHeight: moderateScale(20),
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#4a154b',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    marginRight: moderateScale(8),
    marginBottom: verticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestText: {
    fontSize: moderateScale(12),
    color: '#fff',
    fontWeight: '500',
  },
  interestInput: {
    fontSize: moderateScale(12),
    color: '#fff',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    minWidth: moderateScale(80),
  },
  editInterestButton: {
    marginLeft: moderateScale(6),
    padding: moderateScale(2),
  },
  removeInterestButton: {
    marginLeft: moderateScale(6),
    padding: moderateScale(2),
  },
  addInterestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    marginBottom: verticalScale(8),
  },
  addInterestText: {
    fontSize: moderateScale(12),
    color: '#4a154b',
    fontWeight: '500',
    marginLeft: moderateScale(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    width: '100%',
    maxWidth: moderateScale(400),
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#4a154b',
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  textAreaInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    minHeight: verticalScale(120),
    textAlignVertical: 'top',
    marginBottom: verticalScale(16),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginHorizontal: moderateScale(4),
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  saveModalButton: {
    backgroundColor: '#16a34a',
  },
  saveModalButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dc3545',
    marginHorizontal: moderateScale(20),
    padding: moderateScale(14),
    borderRadius: moderateScale(8),
    marginTop: verticalScale(20),
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(8),
  },
  bottomSpacer: {
    height: verticalScale(20),
  },
});

export default ProfileScreen;