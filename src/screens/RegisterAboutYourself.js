import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
  useWindowDimensions,
  ScrollView,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Responsive scaling functions
const scale = (size) => (screenWidth / 375) * size;
const verticalScale = (size) => (screenHeight / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

const RegisterAboutYourself = ({ 
  initialFormData, 
  onNavigateBack, 
  onRegisterComplete
}) => {
  const [formData, setFormData] = useState({
    aboutYourself: "",
    noOption: "",
    ...initialFormData
  });

  const { width, height } = useWindowDimensions();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCompleteRegistration = () => {
    // Validate about yourself form
    if (!formData.aboutYourself) {
      Alert.alert(
        "Validation Error",
        "Please provide information about yourself",
        [
          {
            text: "OK",
            style: "default"
          }
        ]
      );
      return;
    }

    // Show success alert and navigate to login
    Alert.alert(
      "Registration Successful",
      "Your registration has been completed successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            if (onRegisterComplete) {
              onRegisterComplete(formData);
            }
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

  // Render step circles (1 to 5)
  const renderStepCircles = () => {
    const totalSteps = 5;
    const currentStep = 5;
    
    return (
      <View style={styles.stepCirclesContainer}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View key={index} style={styles.stepCircleWrapper}>
            <View 
              style={[
                styles.stepCircle,
                index + 1 === currentStep && styles.stepCircleActive,
                index + 1 < currentStep && styles.stepCircleCompleted
              ]}
            >
              <Text 
                style={[
                  styles.stepCircleText,
                  (index + 1 === currentStep || index + 1 < currentStep) && styles.stepCircleTextActive
                ]}
              >
                {index + 1}
              </Text>
            </View>
            {index < totalSteps - 1 && (
              <View 
                style={[
                  styles.stepConnector,
                  index + 1 < currentStep && styles.stepConnectorActive
                ]} 
              />
            )}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleNavigateBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>register - about yourself</Text>
      </View>

      {/* Main Content */}
      <KeyboardAvoidingView 
        style={styles.formContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Progress */}
          <View style={styles.stepProgressContainer}>
            {renderStepCircles()}
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepIndicatorText}>5 of 5</Text>
              <View style={styles.stepNavigationText}>
                <Text style={styles.prevStepText}>Prev. Step: Professional Details</Text>
              </View>
            </View>
          </View>

          {/* About Yourself Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>About Yourself</Text>
            
            <View style={styles.aboutYourselfContainer}>
              <Text style={styles.aboutYourselfTitle}>
                Please provide your about yourself:
              </Text>
              
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>About Yourself:</Text>
                <TextInput
                  style={[styles.textInput, styles.aboutYourselfInput]}
                  placeholder="Tell us about yourself..."
                  placeholderTextColor="#666"
                  value={formData.aboutYourself}
                  onChangeText={(value) => handleInputChange('aboutYourself', value)}
                  multiline={true}
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>No:</Text>
                <View style={styles.optionsRow}>
                  <TouchableOpacity 
                    style={[
                      styles.optionButton,
                      formData.noOption === "No" && styles.optionButtonSelected
                    ]}
                    onPress={() => handleInputChange('noOption', "No")}
                  >
                    <Text style={[
                      styles.optionButtonText,
                      formData.noOption === "No" && styles.optionButtonTextSelected
                    ]}>
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>
                  Upload image (Min. 3 images):
                </Text>
                
                <TouchableOpacity style={styles.imageUploadArea}>
                  <View style={styles.imageUploadContent}>
                    <Text style={styles.imageUploadTitle}>
                      Drag & Drop files here
                    </Text>
                    <Text style={styles.imageUploadSubtitle}>
                      (or)
                    </Text>
                    <Text style={styles.imageUploadBrowse}>
                      Browse
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity 
                style={[
                  styles.completeButton,
                  !formData.aboutYourself && styles.completeButtonDisabled
                ]} 
                onPress={handleCompleteRegistration}
                disabled={!formData.aboutYourself}
              >
                <Text style={styles.completeButtonText}>Complete Registration</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(20),
    paddingHorizontal: moderateScale(15),
    paddingBottom: verticalScale(15),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: moderateScale(10),
  },
  backArrow: {
    fontSize: moderateScale(20),
    color: '#4a154b',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#4a154b',
    textTransform: 'lowercase',
    flex: 1,
    textAlign: 'center',
    marginRight: moderateScale(30),
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContent: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(20),
  },
  stepProgressContainer: {
    marginBottom: verticalScale(25),
  },
  stepCirclesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(10),
  },
  stepCircleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  stepCircleCompleted: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  stepCircleText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#e0e0e0',
  },
  stepCircleTextActive: {
    color: '#fff',
  },
  stepConnector: {
    width: moderateScale(20),
    height: 2,
    backgroundColor: '#e0e0e0',
    marginHorizontal: moderateScale(5),
  },
  stepConnectorActive: {
    backgroundColor: '#4a154b',
  },
  stepTextContainer: {
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  stepIndicatorText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(8),
  },
  stepNavigationText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  prevStepText: {
    fontSize: moderateScale(12),
    color: '#6c757d',
  },
  sectionContainer: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#4a154b',
    textAlign: 'center',
    marginBottom: verticalScale(15),
  },
  aboutYourselfContainer: {
    padding: moderateScale(15),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutYourselfTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: verticalScale(18),
  },
  inputLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(8),
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#4a154b',
    borderRadius: moderateScale(8),
    padding: moderateScale(12),
    fontSize: moderateScale(14),
    backgroundColor: '#fff',
    color: '#4a154b',
    minHeight: verticalScale(45),
  },
  aboutYourselfInput: {
    minHeight: verticalScale(120),
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(2),
  },
  optionButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(8),
    borderRadius: moderateScale(8),
    backgroundColor: '#f3f4f6',
    marginHorizontal: moderateScale(3),
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#4a154b',
    borderColor: '#4a154b',
  },
  optionButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#6b7280',
  },
  optionButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  imageUploadArea: {
    borderWidth: 2,
    borderColor: '#4a154b',
    borderStyle: 'dashed',
    borderRadius: moderateScale(8),
    padding: moderateScale(20),
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: verticalScale(120),
  },
  imageUploadContent: {
    alignItems: 'center',
  },
  imageUploadTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4a154b',
    marginBottom: verticalScale(5),
  },
  imageUploadSubtitle: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: verticalScale(5),
  },
  imageUploadBrowse: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#4a154b',
    textDecorationLine: 'underline',
  },
  completeButton: {
    backgroundColor: '#16a34a',
    padding: moderateScale(14),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(10),
    minHeight: verticalScale(45),
  },
  completeButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default RegisterAboutYourself;